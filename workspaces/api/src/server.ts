import cors from '@koa/cors'
import { Raven } from 'raven'
import { MiddlewarePriority, RavenPluginKoa } from 'raven-plugin-koa'
import RavenPluginKoaAuth from 'raven-plugin-koa-auth'
import { RavenPluginSequelize } from 'raven-plugin-sequelize'
import 'sqlite3'
import CountriesController from './controllers/CountriesController'
import TestController from './controllers/TestController'
import TransactionController from './controllers/TransactionController'
import UserController from './controllers/UserController'
import AccountModel from './models/AccountModel'
import TestModel from './models/TestModel'
import TransactionModel from './models/TransactionModel'
import UserModel from './models/UserModel'

const server = new Raven()

// Database
server
  .usePlugin(RavenPluginSequelize)
  .configure({
    dialect: 'sqlite',
    storage: ':memory:',
  })
  .useModel(TestModel)
  .useModel(UserModel)
  .useModel(AccountModel)
  .useModel(TransactionModel)

server
  .usePlugin(RavenPluginKoa)
  .configure((opt) => {
    opt.port = 8080
  })
  .useKoaMiddleware(MiddlewarePriority.PreIngress, cors({ origin: '*' }))
  .useController(TestController)
  .useController(UserController)
  .useController(TransactionController)
  .useController(CountriesController)

// Web engine and authorization
server.usePlugin(RavenPluginKoaAuth).configure({
  blockWithoutToken: false,
  defaultAuthorized: false,
  secret: 'jwt-secret',
})

export default server
