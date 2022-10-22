export default class PPPPredictor {
  constructor(private sourceCountry: string, private targetCountry: string) {}

  getPrice(category: string, amount: number) {
    if (this.sourceCountry == 'hu') return amount * 1.2
    return amount * 0.8
  }
}
