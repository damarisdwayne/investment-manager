export type Customer = {
  customerName?: string;
  customerFistName?: string;
  cpf?: number;
  cpfString?: string;
  email?: string;
  phone?: string;
  city?: string;
  uf?: string;
  dateInitial?: string;
  isEmailVerified?: boolean;
  isAdmin?: boolean;
};

export interface INewAsset {
  ticker: string;
  assetName: string | null;
  exchangeName: any;
  total: number;
  operation: string;
  operationType: number;
  operationDate: string | Date;
  dueDate?: string | Date;
  category: number;
  categoryName: string;
  tax?: number;
  typeTax?: string;
  qtd?: number;
  price?: number;
  market?: string;
  marketType?: number;
  sector?: string | null;
  sectorKey?: string | null;
  segment?: string;
  cnpj?: string;
  cnpjAdmin?: string;
  administrator?: any;
  assetGroup?: string;
  assetSeries?: string;
  rate?: string | number | null;
  currency?: string;
}

export type Indexes = {
  stock: string;
  name: string;
};

export type StockData = {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number | null;
  logo: string;
  sector: string | null;
  type: "stock" | "fund" | "bdr";
};

export interface IStock {
  indexes: Indexes[];
  stocks: StockData[];
  availableSectors: string[];
  availableStockTypes: ("stock" | "fund" | "bdr")[];
}

export type AssetInfoData = {
  currency: string;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  shortName: string;
  longName: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  symbol: string;
  summaryProfile: SummaryProfile;
  priceEarnings: number;
  earningsPerShare: number;
  logourl: string;
};

export type SummaryProfile = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  website: string;
  industry: string;
  industryKey: string;
  industryDisp: string;
  sector: string;
  sectorKey: string;
  sectorDisp: string;
  longBusinessSummary: string;
  fullTimeEmployees: number;
  companyOfficers: any[];
};

export interface IAssetInfo {
  results: AssetInfoData[];
  requestedAt: string;
  took: string;
}
