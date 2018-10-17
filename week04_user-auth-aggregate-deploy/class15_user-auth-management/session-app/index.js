const app = require('./lib/app');
require('./lib/util/connect')('mongodb://172.17.0.2:27017/class');

app.listen(7890);
