import { Route } from 'raven-plugin-koa'
import { injectable } from 'tsyringe'

@injectable()
@Route.Prefix('/countries')
export default class CountriesController {
  @Route.Get('/')
  getCountries() {
    return Object.values(countries)
  }
}

export const countries: { [key: string]: CountryDescription } = {
  es: { id: 'es', currency: 'EUR', image: '/file/es.svg', country: 'Spain' },
  at: { id: 'at', currency: 'EUR', image: '/file/at.svg', country: 'Austria' },
  fr: { id: 'fr', currency: 'EUR', image: '/file/fr.svg', country: 'France' },
  dk: { id: 'dk', currency: 'DKK', image: '/file/dk.svg', country: 'Denmark' },
  se: { id: 'se', currency: 'SEK', image: '/file/se.svg', country: 'Sweden' },
  de: { id: 'de', currency: 'EUR', image: '/file/de.svg', country: 'Germany' },
  hu: { id: 'hu', currency: 'HUF', image: '/file/hu.svg', country: 'Hungary' },
}

interface CountryDescription {
  currency: string
  country: string
  id: string
  image: string
}
