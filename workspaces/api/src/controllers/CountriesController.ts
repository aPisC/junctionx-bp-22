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
  es: { id: 'es', currency: 'EUR', image: '/file/es.svg', country: 'Spain', exchange: 1 },
  at: { id: 'at', currency: 'EUR', image: '/file/at.svg', country: 'Austria', exchange: 1 },
  fr: { id: 'fr', currency: 'EUR', image: '/file/fr.svg', country: 'France', exchange: 1 },
  dk: { id: 'dk', currency: 'DKK', image: '/file/dk.svg', country: 'Denmark', exchange: 7.5 },
  se: { id: 'se', currency: 'SEK', image: '/file/se.svg', country: 'Sweden', exchange: 11 },
  de: { id: 'de', currency: 'EUR', image: '/file/de.svg', country: 'Germany', exchange: 1 },
  hu: { id: 'hu', currency: 'HUF', image: '/file/hu.svg', country: 'Hungary', exchange: 410 },
}

interface CountryDescription {
  currency: string
  country: string
  id: string
  image: string
  exchange: number
}
