exports.configure = function(App) {
  App.use('/v1/task', require('./task'));
}
