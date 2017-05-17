'use strict';

const cluster = require('cluster');

if (cluster.isMaster) { 

    for (let i of require('os').cpus()) { // Create a worker for each CPU
        cluster.fork();
    }
}
else {
	const app = require('koa')(), session = require('koa-session'), fs = require('fs'), router = require('./app/routes/routes'),
        config = JSON.parse(fs.readFileSync(__dirname + '/app/configs/config.json')), thinky = require('./app/modules/thinky/thinky'),
        db = require('./app/modules/services/db'), log = require('./app/modules/services/logger'), http = config.server.port, https = config.server.httpsPort;
		
		 app.use(require('koa-sslify')({port: https}));
    app.use(session(app));
    app.use(require('koa-static')('./public', {
      maxAge: '5',
      setHeaders: function (res, path) {
        res.setHeader('Cache-Control', 'no-cache')
    }
    }));
    app.use(require('koa-static')('./public/fonts', {
      maxAge: '5',
      setHeaders: function (res, path) {
        res.setHeader('Cache-Control', 'public, max-age=0')
    }
    }));
    app.use(require('koa-body')({formidable: {uploadDir: './uploads'}, multipart: true, urlencoded: true}));

    new (require('koa-pug'))({viewPath: './views', basedir: './views', app: app}); // equals to pug.use(app) and app.use(pug.middleware)
	
	 app.use(function *(next) { // Common error handler using middleware. All Error messages can handle from here
        try {
            yield next;
        } catch (err) {

            console.log('seesion created', err);

            log.error(err);

            if(this.session.audit != null ||this.session.audit != '' ) {
                this.session.audit.status = 'Error';
                db.processEnd(this.session.audit.email, this.session.audit);

            }
            this.session = null;

            if (err.message == '406') {
                this.body = yield render('inprocess');
            } else {
                this.body = yield render('errorpage');
            }
        }
    });

    const render = require('co-views')(__dirname + '/views', {map: {html: 'ejs'}});
    
    global.renderview = render;

    app.use(router.routes()); // Configure Router
    app.use(router.allowedMethods());

    for (let model of require('./app/modules/thinky/schema').models) { // DB configuration
        global[model.tableName] = thinky.createModel(model.tableName, model.schema, model.options);
    }

    // Code to run if we're in a worker process
    app.listen(http);
    require('https').createServer({key: fs.readFileSync('server.key.pem'), cert: fs.readFileSync('server.cert.pem')}, app.callback()).listen(https);
    log.info('Http(s) server running on port', https);

}
