import axios from 'axios'
import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { BACKEND_URL } from './config/backendUrl'

export function initTracer() {
  ;(window as any).traces = []
  setInterval(loop, 5000)
}

function loop() {
  const traces = (window as any).traces
  ;(window as any).traces = []

  if (traces.length > 0) axios.post(`${BACKEND_URL}/api/trace`, traces).catch(() => {})
}

export function useComponentTracing(key: string) {
  useEffect(() => {
    const id = uuid()
    ;(window as any).traces.push({
      key: key,
      token: localStorage.getItem('token'),
      id: id,
      href: window.location.href,
      appear: 'in',
    })
    return () =>
      (window as any).traces.push({
        key: key,
        token: localStorage.getItem('token'),
        id: id,
        href: window.location.href,
        appear: 'out',
      })
  }, [])
}
