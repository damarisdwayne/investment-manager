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

export interface AnswerData {
  questionId?: string;
  answer: string;
}

export interface IAsset {
  ticker: string;
  assetName: string | null;
  exchangeName: any;
  total: number;
  operation: string;
  operationType: number;
  operationDate: string | Date;
  id?: string;
  dueDate?: string | Date;
  category: number;
  categoryName: string;
  tax?: number;
  typeTax?: string;
  qtd?: number | null;
  price?: number | null;
  market?: string;
  marketType?: number;
  sector?: string | null;
  sectorKey?: string | null;
  industry?: string | null;
  industryKey?: string | null;
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

export interface QuoteData {
  exchange: string;
  shortname: string;
  quoteType: string;
  symbol: string;
  index: string;
  score: number;
  typeDisp: string;
  longname: string;
  exchDisp: string;
  sector: string;
  sectorDisp: string;
  industry: string;
  industryDisp: string;
  dispSecIndFlag: boolean;
  isYahooFinance: boolean;
}

export interface IYahooFinanceAssetData {
  explains: any[];
  count: number;
  quotes: QuoteData[];
}

export interface Result {
  meta: {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    hasPrePostMarketData: boolean;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    previousClose: number;
    scale: number;
    priceHint: number;
    currentTradingPeriod: {
      pre: {
        timezone: string;
        end: number;
        start: number;
        gmtoffset: number;
      };
      regular: {
        timezone: string;
        end: number;
        start: number;
        gmtoffset: number;
      };
      post: {
        timezone: string;
        end: number;
        start: number;
        gmtoffset: number;
      };
    };
    tradingPeriods: [
      [
        {
          timezone: string;
          end: number;
          start: number;
          gmtoffset: number;
        },
      ],
    ];
    dataGranularity: string;
    range: string;
    validRanges: string[];
  };
  timestamp: number[];
  indicators: {
    quote: {
      high: number[];
      volume: number[];
      low: number[];
      open: number[];
      close: number[];
    };
  };
}

export interface IYahooFinanceChartData {
  chart: {
    result: Result[];
  };
}

export interface CoinData {
  coins: string[];
}

export interface AvaiableStockList {
  indexes: any[];
  stocks: string[];
}

export type StockDetail = {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number;
  logo: string;
  sector: string;
  type: string;
};

export interface QuoteListResponse {
  indexes: { stock: string; name: string }[];
  stocks: StockDetail[];
  availableSectors: string[];
  availableStockTypes: string[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalCount: number;
  hasNextPage: boolean;
}

export interface ExchangeRateResponse {
  base: string;
  results: {
    [currency: string]: number;
  };
  updated: string;
  ms: number;
}
