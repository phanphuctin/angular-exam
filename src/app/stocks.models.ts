export interface CompanyStock {
  data: StockData,
  name: CompanyName
}

export interface CompanySearch {
  count: number;
  result: Array<CompanyName>;
}

export interface CompanyName {
  description: string,
  displaySymbol:string,
  symbol: string,
  type: string
}

export interface Sentiment {
  data: Array<SentimentStockData>,
  symbol: string
}

export interface SentimentStockData {
  symbol: string,
  year: number,
  month: number,
  change: number,
  mspr: number
}

export interface StockData {
  c: number,
  d: number,
  dp: number,
  h: number,
  l: number,
  o: number,
  pc: number,
  t: number
}

