import express from 'express'
import registerApi from './components/registerApi'
import registerApp from './components/registerApp'

const app = express()

Promise.resolve()
  .then(() => registerApi(app))
  .then(() => registerApp(app))
  .then(() =>
    app.listen(3000, () => {
      console.log('Standalone server is listening on port 3000')
    })
  )
