import fs from 'fs'
import path from 'path'

export default class PPPPredictor {
  private lookup: any
  constructor(private sourceCountry: string, private targetCountry: string) {
    this.lookup = data[sourceCountry]?.[targetCountry]
    if (!this.lookup) throw new Error('unable to initialize pppPredictor')
  }

  getPrice(category: string, amount: number) {
    const portion = this.lookup[category] || 1
    return amount * portion
  }
}

// loading csv
const data: any = {}
const csvPath = path.join(__dirname, '..', '..', 'assets', 'ppp_indices.csv')
console.log('Reading ppp csv file from', csvPath)

const file = fs.readFileSync(csvPath, { encoding: 'utf-8' })
file
  .toString()
  .split('\n')
  .filter((_, i) => i > 0)
  .forEach((line) => {
    const sl = line.split(',')
    const from = sl[1]
    const to = sl[2]
    const category = sl[3]
    const portion = parseFloat(sl[4])

    data[from] = data[from] || {}
    data[from][to] = data[from][to] || {}
    data[from][to][category] = portion
  })
