console.log("env:",process.env )
console.log("node_env:",process.env.NODE_ENV )

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
