'use strict';

const views = require('co-views'), router = require('koa-router')(), request = require('koa-request'), db = require('../modules/services/db'),
    moment = require('moment'), reqService = require('./../modules/services/processor'), log = require('./../modules/services/logger'),q = require('q'),
    oflow = JSON.parse(require('fs').readFileSync(__dirname + '/../configs/config.json')).oFlow;

router.get('/', getView);
router.post('/', processData);
router.get('/report', function*() {this.body = yield renderview('report');});
router.post('/report/email', function*() {this.body = yield reqService.reportsByemail(this.request.body);});
router.get('/report/count', function*() {this.body = yield reqService.auditDataCount();});
router.post('/report/dateRangeCount', function*() {this.body = yield reqService.dateRangeCount(this.request.body);});
router.post('/report/emailCount', function*() {this.body = yield reqService.emailCount(this.request.body);});


function oflowStatus(ldeferred) {

    require('request')(oflow.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            ldeferred.resolve(true);
            log.info('oFlow available');
        }else{
            ldeferred.resolve(false);
            log.info('oFlow not available');
        }
    })
}



function *getView() {
    const ldeferred = q.defer();
    oflowStatus(ldeferred);
   let  live = yield ldeferred.promise;

  if(live) {
      this.session.audit = {

          email: null,
          appid: null,
          login_time: moment().format(),
          status: null,
          firstname: null,
          lastname: null,
          pstatus: null,
          jstatus: null
      };
      this.session.query = this.request.query;
      log.info('query string', this.session.query);


      this.body = yield renderview('index');
  }else {
      this.body = yield renderview('errorpage');
  }
}

function *processData() { // Method to handle the form data
 
    if(this.session.audit == undefined){
    this.session.audit = {
          email: null,
          appid: null,
          status: null,
          firstname: null,
          lastname: null,
          pstatus: null,
          jstatus: null,
          
      };
    }

    let ip = this.request.ip;
    if (ip.substr(0, 7) == "::ffff:"){ip = ip.substr(7)}
    log.info('Ip Address', ip);
    let data = Object.assign(this.request.body, {ip:ip});
    this.session.audit.email = data.email;
    this.session.audit.firstname = data.firstname;
    this.session.audit.lastname = data.lastname;
    this.session.audit.product = data.productname;
    let audit = this.session.audit;
    db.procesStart(data,this.session);
    let status = yield reqService.processSocure(data, this.session);

    if (status) {

        data.dob = moment(data.dob).calendar();
        data.jdob = moment(data.jdob).calendar();
        let oflowData = Object.assign(data, this.session.query);
        oflowData = Object.assign(oflowData, {appid:this.session.audit.appid});
        this.session.audit.response_display_time = moment().format();
        this.session.audit.status = 'Approved';
       
        if (data.jfirstname) {
            this.render('oFlowJoint', oflowData);
        } else {

            this.render('oFlow', oflowData);
        }
        db.processEnd(data.email, audit);

    } else {

        this.session.audit.response_display_time = moment().format();
        this.session.audit.status = 'Reject';

        db.processEnd(data.email, audit);
        this.body = yield renderview('denied');
    }
    this.session = null;
}

module.exports = router;