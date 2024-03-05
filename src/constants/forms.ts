export enum AssetGroup {
  STOCK = "stock",
  STOCK_USA = "stockUsa",
  BDR = "bdr",
  SUBSCRIPTION_RIGHT = "subscriptionRight",
  ETF = "etf",
  FI_AGRO = "fiAgro",
  FII = "fii",
  REIT = "reit",
  TREASURY = "treasury",
  CCB = "ccb",
  CDB = "cdb",
  CRA = "cra",
  CRI = "cri",
  DEBENTURE = "debenture",
  DEBENTURE_INCENTIVADA = "debentureIncentivada",
  FIDC = "fidc",
  LC = "lc",
  LCA = "lca",
  LCI = "lci",
  LF = "lf",
  LIG = "lig",
  RDB = "rdb",
  RDC = "rdc",
}

export const assetListType = [
  { label: "Todos", bgColor: "slate-50" },
  { label: "Ações Internacionais", bgColor: "international-stocks" },
  { label: "Ações Nacionais", bgColor: "national-stocks" },
  { label: "Renda Fixa", bgColor: "fixed-income" },
  { label: "Fundos Imobiliários", bgColor: "real-estate-funds" },
  { label: "REITs", bgColor: "reits" },
  { label: "Criptomoedas", bgColor: "cryptocurrencies" },
  { label: "Ouro", bgColor: "gold" },
];

export const financialAssets = [
  { option: "stock", value: "Ações" },
  { option: "stockUsa", value: "Ações EUA" },
  { option: "bdr", value: "BDR" },
  // { option: "expenses", value: "Despesas" },
  { option: "subscriptionRight", value: "Direito de subscrição" },
  // { option: "futUsd", value: "Dólar Futuro" },
  { option: "etf", value: "ETF" },
  // { option: "etfFixedIncome", value: "ETF Renda Fixa" },
  { option: "etfUsa", value: "ETF USA" },
  { option: "fiAgro", value: "FI Agro" },
  { option: "fii", value: "Fundo Imobiliário" },
  // { option: "fundExemption", value: "Fundos Isentos" },
  // { option: "futOth", value: "Futuros Outros" },
  // { option: "futIdx", value: "Índice Futuro" },
  // { option: "futFee", value: "Juros Futuros" },
  // { option: "option", value: "Opções" },
  // { option: "optionUsa", value: "Opções EUA" },
  // { option: "flexOption", value: "Opções Flexíveis" },
  // { option: "gold", value: "Ouro na bolsa" },
  { option: "reit", value: "REIT" },
  // { option: "fixedIncomeUsa", value: "Renda Fixa EUA" },
  // { option: "term", value: "Termo" },
];

export const fixedIncomeAssets = [
  { option: "ccb", value: "CCB" },
  { option: "cdb", value: "CDB" },
  { option: "cra", value: "CRA" },
  { option: "cri", value: "CRI" },
  { option: "debenture", value: "Debênture" },
  { option: "debentureIncentivada", value: "Debênture incentivada" },
  { option: "fidc", value: "FIDC" },
  { option: "lc", value: "LC" },
  { option: "lca", value: "LCA" },
  { option: "lci", value: "LCI" },
  { option: "lf", value: "LF" },
  { option: "lig", value: "LIG" },
  { option: "rdb", value: "RDB" },
  { option: "rdc", value: "RDC" },
];

export const accountAssets = [
  { option: "accountUSD", value: "Conta corrente em dólar" },
  { option: "accountBRL", value: "Conta corrente em real" },
];

export const treasuryAssets = [{ option: "treasury", value: "Tesouro Direto" }];

export const financialOperation = [
  { option: "subscription", value: "Subscrição" },
  { option: "bonus", value: "Bonificação" },
  { option: "manualBuy", value: "Compra" },
  { option: "manualSell", value: "Venda" },
  { option: "ipo", value: "IPO" },
  { option: "fees", value: "Taxas" },
  { option: "provent", value: "Proventos/Sobras" },
  { option: "cashout", value: "Cashout" },
];

export const fixedIncomeOperation = [
  { option: "application", value: "Aplicação" },
];

export const treasuryOperation = [
  { option: "application", value: "Aplicação" },
  { option: "sale", value: "Venda" },
];

export const cryptocurrencyOperation = [
  { option: "", value: "" },
  { option: "manualBuy", value: "Compra" },
  { option: "manualSell", value: "Venda" },
  { option: "importCryptoBuy", value: "Permuta - Compra" },
  { option: "importCryptoSell", value: "Permuta - Venda" },
];
