export function objectsToString(object: any) {
  return objectsToArray(object).join(' ')
}

export function objectsToArray(object: any) {
  let result: any = []

  Object.values(object).forEach((value) => {
    if (typeof value === 'string') {
      result = [...result, value]
    } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      result = [...result, ...objectsToArray(value)]
    }

    return undefined
  })

  return result
}

export function commify(n: number) {
  var parts = n.toString().split('.')
  const numberPart = parts[0]
  const decimalPart = parts[1]
  const thousands = /\B(?=(\d{3})+(?!\d))/g
  return numberPart.replace(thousands, ' ') + (decimalPart ? '.' + decimalPart : '')
}
