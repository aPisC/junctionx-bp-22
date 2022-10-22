import axios from 'axios'
import { BACKEND_URL } from '../config/backendUrl'

interface FlagDescription {
  currency: string
  country: string
  id: string
  image: string
}

export const FlagsRequest = axios.get<FlagDescription[]>(`${BACKEND_URL}/api/countries`).then((r) => r.data)
