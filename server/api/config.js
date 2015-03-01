development = {
  server: {
    port: process.env.PORT || 3000,
    https: {
      enabled: false
    }
  },
  database: {
    connection: 'mongodb://localhost:27017/server-dev'
  }
}

production = {
  
}

switch(process.env.NODE_ENV) {
  case 'development': return module.exports = development;
  default: return module.exports = production;
}
