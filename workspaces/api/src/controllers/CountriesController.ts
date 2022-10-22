import { Route } from 'raven-plugin-koa'
import { injectable } from 'tsyringe'

@injectable()
@Route.Prefix('/countries')
export default class CountriesController {
  @Route.Get('/')
  getCountries() {
    return Object.keys(countries)
  }
}

export const countries: { [key: string]: CountryDescription } = {
  es: { currency: 'EUR' },
  at: { currency: 'EUR' },
  fr: { currency: 'EUR' },
  dk: { currency: 'EUR' },
  se: { currency: 'EUR' },
  de: { currency: 'EUR' },
  hu: { currency: 'HUF' },
}

interface CountryDescription {
  currency: string
}
