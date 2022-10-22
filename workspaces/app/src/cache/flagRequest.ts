import axios from 'axios'
import { BACKEND_URL } from '../config/backendUrl'

export const FlagsRequest = axios.get(`${BACKEND_URL}/api/countries`).then((r) => r.data)
