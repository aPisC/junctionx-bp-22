import express, { Express } from 'express'
import path from 'path'

const PATH = path.join(__dirname, '../../../app/dist')

export default async function registerApp(app: Express) {
  app.use(express.static(PATH))
  app.get('*', (_, res) => {
    res.sendFile(PATH + '/index.html')
  })
}
