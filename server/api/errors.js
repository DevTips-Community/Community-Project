module.exports = {
  notFound: function(req, res, next) {
    res.status(404);
    next({ name: 'NotFoundError', message: 'Route "' + req.url + '" could not be found' });
  },
  handler: function(error, req, res, next) {
    if(!res.statusCode || res.statusCode == 200) res.status(500);
    var json = {
      error: error.name,
      message: error.message
    };
    if(error.errors) json.errors = error.errors;
    res.json(json);
  }
}
