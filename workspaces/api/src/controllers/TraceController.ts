import { Route } from 'raven-plugin-koa'

@Route.Prefix('/trace')
export default class TraceController {
  @Route.Post('/')
  collect(ctx: any) {
    const body = ctx.request.body
    if (Array.isArray(body)) {
      body.forEach((tr) => console.log(JSON.stringify(tr, null, 2)))
    }
  }
}
