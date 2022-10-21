import api from 'api/dist/server'
import { Express } from 'express'
import Koa from 'koa'
import 'sqlite3'

export default async function registerApi(app: Express) {
  await api.hooks.initialize.execute()
  await api.hooks.start.execute()

  const koa = api.dependencyContainer.resolve<Koa>(Koa)
  const callback = koa.callback()

  app.use((req, res, next) => {
    if (req.url.startsWith('/api/')) {
      req.url = req.url.substring(4)
      return callback(req, res)
    }
    return next()
  })
}
