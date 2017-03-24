const express      = require('express'),
      mysql        = require('mysql'),
      exhbs        = require('express-handlebars'),
      connectionPv = require('connection-provider'),
      app          = express();

const pics       = require('./routes/pics');
const PicService = require('./services/picService');

const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'password',
    database: 'catCam'
};
const serviceSetupCallBack = (connection) => {
    return {
        picService: new PicService(connection)
    }
  };

app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(express.static('public'));
app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', pics.pics);
app.get('/data', pics.data);

const port = process.env.PORT || 2000;
const server = app.listen(port, () => {
  const port = server.address().port;
  console.log('App running on http://%s:%s', 'localhost', port);
});
