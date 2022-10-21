import { Raven } from 'raven'
import { RavenPluginKoa } from 'raven-plugin-koa'
import RavenPluginKoaAuth from 'raven-plugin-koa-auth'
import { RavenPluginSequelize } from 'raven-plugin-sequelize'
import 'sqlite3'
import TestController from './controllers/TestController'
import TestModel from './models/TestModel'

const server = new Raven()

// Database
server
  .usePlugin(RavenPluginSequelize)
  .configure({
    dialect: 'sqlite',
    storage: ':memory:',
  })
  .useModel(TestModel)

server
  .usePlugin(RavenPluginKoa)
  .configure((opt) => {
    opt.port = 8080
  })
  .useController(TestController)

// Web engine and authorization
server.usePlugin(RavenPluginKoaAuth).configure({
  blockWithoutToken: false,
  defaultAuthorized: false,
  secret: 'jwt-secret',
})

export default server
