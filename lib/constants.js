const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

export function getAllConstants() {
  const constants = {
    "FINNHUB_PROFILE2_API_URL": FINNHUB_PROFILE2_API_URL,
    "FINNHUB_SYMBOL_API_URL": FINNHUB_SYMBOL_API_URL,
    "EXCHANGES_REGIONS": EXCHANGES_REGIONS,
    "EXCHANGES": EXCHANGES,
  }
  
  return constants;
}

export const FINNHUB_PROFILE2_API_URL = "https://finnhub.io/api/v1/stock/profile2?symbol="
export const FINNHUB_SYMBOL_API_URL = "https://finnhub.io/api/v1/stock/symbol?exchange="
export const EXCHANGES_REGIONS = ["Africa", "America", "Middle East", "Asia", "Europe", "South Pacific"]
export const EXCHANGES = {
    "Africa": [
      {
        "gfinance_code": "JSE",
        "gfinance_name": "Johannesburg Stock Exchange",
        "finnhub_code": "JO",
        "finnhub_name": "JOHANNESBURG STOCK EXCHANGE",
        "finnhub_mic": "XJSE",
        "finnhub_timezone": "Africa/Johannesburg",
        "finnhub_hour": "09:00-17:00"
      }
    ],
    "America": [
      {
        "gfinance_code": "BCBA",
        "gfinance_name": "Buenos Aires Stock Exchange",
        "finnhub_code": "BA",
        "finnhub_name": "BOLSA DE COMERCIO DE BUENOS AIRES",
        "finnhub_mic": "XBUE",
        "finnhub_timezone": "America/Argentina/Buenos_Aires",
        "finnhub_hour": "10:30-17:15"
      },
      {
        "gfinance_code": "BMV",
        "gfinance_name": "Mexican Stock Exchange",
        "finnhub_code": "MX",
        "finnhub_name": "BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)",
        "finnhub_mic": "XMEX",
        "finnhub_timezone": "America/Mexico_City",
        "finnhub_hour": "08:00-15:10"
      },
      {
        "gfinance_code": "CNSX",
        "gfinance_name": "Canadian Securities Exchange",
        "finnhub_code": "CN",
        "finnhub_name": "CANADIAN NATIONAL STOCK EXCHANGE",
        "finnhub_mic": "XCNQ",
        "finnhub_timezone": "America/New_York",
        "finnhub_hour": "08:00-17:00"
      },
      {
        "gfinance_code": "NYSE",
        "gfinance_name": "New York Stock Exchange",
        "finnhub_code": "US",
        "finnhub_name": "US exchanges (NYSE)",
        "finnhub_mic": "XASE",
        "finnhub_timezone": "America/New_York",
        "finnhub_hour": "09:30-16:00"
      },
      {
        "gfinance_code": "NASDAQ",
        "gfinance_name": "NASDAQ Last Sale",
        "finnhub_code": "US",
        "finnhub_name": "US exchanges (Nasdaq)",
        "finnhub_mic": "XNAS",
        "finnhub_timezone": "America/New_York",
        "finnhub_hour": "09:30-16:00"
      },
      {
        "gfinance_code": "BVMF",
        "gfinance_name": "B3 - Brazil Stock Exchange and Over-the-Counter Market",
        "finnhub_code": "SA",
        "finnhub_name": "Brazil Bolsa - Sao Paolo",
        "finnhub_mic": "BVMF",
        "finnhub_timezone": "America/Sao_Paulo",
        "finnhub_hour": "09:45-18:45"
      },
      {
        "gfinance_code": "TSE",
        "gfinance_name": "Toronto Stock Exchange",
        "finnhub_code": "NE",
        "finnhub_name": "AEQUITAS NEO EXCHANGE",
        "finnhub_mic": "NEOE",
        "finnhub_timezone": "America/Toronto",
        "finnhub_hour": "09:30-16:00"
      },
      {
        "gfinance_code": "TSX",
        "gfinance_name": "Toronto Stock Exchange",
        "finnhub_code": "TO",
        "finnhub_name": "TORONTO STOCK EXCHANGE",
        "finnhub_mic": "XTSE",
        "finnhub_timezone": "America/Toronto",
        "finnhub_hour": "09:30-16:00"
      },
      {
        "gfinance_code": "TSXV",
        "gfinance_name": "Toronto TSX Ventures Exchange",
        "finnhub_code": "V",
        "finnhub_name": "TSX VENTURE EXCHANGE - NEX",
        "finnhub_mic": "XTSX",
        "finnhub_timezone": "America/Toronto",
        "finnhub_hour": "09:30-16:15"
      }
    ],
    "Middle East": [
      {
        "gfinance_code": "TLV",
        "gfinance_name": "Tel Aviv Stock Exchange",
        "finnhub_code": "TA",
        "finnhub_name": "TEL AVIV STOCK EXCHANGE",
        "finnhub_mic": "XTAE",
        "finnhub_timezone": "Asia/Jerusalem",
        "finnhub_hour": "09:45-17:14"
      },
      {
        "gfinance_code": "TADAWUL",
        "gfinance_name": "Saudi Stock Exchange",
        "finnhub_code": "SR",
        "finnhub_name": "SAUDI STOCK EXCHANGE",
        "finnhub_mic": "XSAU",
        "finnhub_timezone": "Asia/Riyadh",
        "finnhub_hour": "10:00-15:10"
      },
    ],
    "Asia": [
      {
        "gfinance_code": "BKK",
        "gfinance_name": "Thailand Stock Exchange",
        "finnhub_code": "BK",
        "finnhub_name": "STOCK EXCHANGE OF THAILAND",
        "finnhub_mic": "XBKK",
        "finnhub_timezone": "Asia/Bangkok",
        "finnhub_hour": "09:30-17:00"
      },
      {
        "gfinance_code": "SHA",
        "gfinance_name": "Shanghai Stock Exchange",
        "finnhub_code": "SS",
        "finnhub_name": "SHANGHAI STOCK EXCHANGE",
        "finnhub_mic": "XSHG",
        "finnhub_timezone": "Asia/Brunei",
        "finnhub_hour": "09:15-15:30"
      },
      {
        "gfinance_code": "HKG",
        "gfinance_name": "Hong Kong Stock Exchange",
        "finnhub_code": "HK",
        "finnhub_name": "HONG KONG EXCHANGES AND CLEARING LTD",
        "finnhub_mic": "XHKG",
        "finnhub_timezone": "Asia/Hong_Kong",
        "finnhub_hour": "09:00-16:10"
      },
      {
        "gfinance_code": "IDX",
        "gfinance_name": "Indonesia Stock Exchange",
        "finnhub_code": "JK",
        "finnhub_name": "INDONESIA STOCK EXCHANGE",
        "finnhub_mic": "XIDX",
        "finnhub_timezone": "Asia/Jakarta",
        "finnhub_hour": "08:45-15:15"
      },
      {
        "gfinance_code": "NSE",
        "gfinance_name": "National Stock Exchange of India",
        "finnhub_code": "NS",
        "finnhub_name": "NATIONAL STOCK EXCHANGE OF INDIA",
        "finnhub_mic": "XNSE",
        "finnhub_timezone": "Asia/Kolkata",
        "finnhub_hour": "09:00-16:00"
      },
      {
        "gfinance_code": "KLSE",
        "gfinance_name": "Bursa Malaysia",
        "finnhub_code": "KL",
        "finnhub_name": "BURSA MALAYSIA",
        "finnhub_mic": "XKLS",
        "finnhub_timezone": "Asia/Kuala_Lumpur",
        "finnhub_hour": "08:30-17:00"
      },
      {
        "gfinance_code": "KOSDAQ",
        "gfinance_name": "KOSDAQ",
        "finnhub_code": "KQ",
        "finnhub_name": "KOREA EXCHANGE (KOSDAQ)",
        "finnhub_mic": "XKOS",
        "finnhub_timezone": "Asia/Seoul",
        "finnhub_hour": "09:00-15:30"
      },
      {
        "gfinance_code": "KRX",
        "gfinance_name": "Korea Stock Exchange",
        "finnhub_code": "KS",
        "finnhub_name": "KOREA EXCHANGE (STOCK MARKET)",
        "finnhub_mic": "XKRX",
        "finnhub_timezone": "Asia/Seoul",
        "finnhub_hour": "08:00-18:00"
      },
      {
        "gfinance_code": "SHE",
        "gfinance_name": "Shenzhen Stock Exchange",
        "finnhub_code": "SZ",
        "finnhub_name": "SHENZHEN STOCK EXCHANGE",
        "finnhub_mic": "XSHE",
        "finnhub_timezone": "Asia/Shanghai",
        "finnhub_hour": "09:15-15:00"
      },
      {
        "gfinance_code": "SGX",
        "gfinance_name": "Singapore Exchange",
        "finnhub_code": "SI",
        "finnhub_name": "SINGAPORE EXCHANGE",
        "finnhub_mic": "XSES",
        "finnhub_timezone": "Asia/Singapore",
        "finnhub_hour": "08:30-17:16"
      },
      {
        "gfinance_code": "TPE",
        "gfinance_name": "Taiwan Stock Exchange",
        "finnhub_code": "TW",
        "finnhub_name": "TAIWAN STOCK EXCHANGE",
        "finnhub_mic": "XTAI",
        "finnhub_timezone": "Asia/Taipei",
        "finnhub_hour": "09:00-17:00"
      },
      {
        "gfinance_code": "TYO",
        "gfinance_name": "Tokyo Stock Exchange",
        "finnhub_code": "T",
        "finnhub_name": "TOKYO STOCK EXCHANGE-TOKYO PRO MARKET",
        "finnhub_mic": "XJPX",
        "finnhub_timezone": "Asia/Tokyo",
        "finnhub_hour": "09:00-15:00"
      }
    ],
    "South Pacific": [
      {
        "gfinance_code": "ASX",
        "gfinance_name": "Australian Securities Exchange",
        "finnhub_code": "AX",
        "finnhub_name": "ASX - ALL MARKETS",
        "finnhub_mic": "XASX",
        "finnhub_timezone": "Australia/Sydney",
        "finnhub_hour": "10:00-16:00"
      },
      {
        "gfinance_code": "NZE",
        "gfinance_name": "New Zealand Stock Exchange",
        "finnhub_code": "NZ",
        "finnhub_name": "NEW ZEALAND EXCHANGE LTD",
        "finnhub_mic": "XNZE",
        "finnhub_timezone": "Pacific/Auckland",
        "finnhub_hour": "10:00-16:45"
      }
    ],
    "Europe": [
      {
        "gfinance_code": "AMS",
        "gfinance_name": "Euronext Amsterdam",
        "finnhub_code": "AS",
        "finnhub_name": "NYSE EURONEXT - EURONEXT AMSTERDAM",
        "finnhub_mic": "XAMS",
        "finnhub_timezone": "Europe/Amsterdam",
        "finnhub_hour": "09:00-17:40"
      },
      {
        "gfinance_code": "ETR",
        "gfinance_name": "Deutsche Börse XETRA",
        "finnhub_code": "DE",
        "finnhub_name": "XETRA",
        "finnhub_mic": "XETR",
        "finnhub_timezone": "Europe/Berlin",
        "finnhub_hour": "09:00-17:30"
      },
      {
        "gfinance_code": "FRA",
        "gfinance_name": "Deutsche Börse Frankfurt Stock Exchange",
        "finnhub_code": "F",
        "finnhub_name": "DEUTSCHE BOERSE AG",
        "finnhub_mic": "XFRA",
        "finnhub_timezone": "Europe/Berlin",
        "finnhub_hour": "08:00-20:00"
      },
      {
        "gfinance_code": "EBR",
        "gfinance_name": "Euronext Brussels",
        "finnhub_code": "BR",
        "finnhub_name": "NYSE EURONEXT - EURONEXT BRUSSELS",
        "finnhub_mic": "XBRU",
        "finnhub_timezone": "Europe/Brussels",
        "finnhub_hour": "09:00-17:30"
      },
      {
        "gfinance_code": "CPH",
        "gfinance_name": "NASDAQ OMX Copenhagen",
        "finnhub_code": "CO",
        "finnhub_name": "OMX NORDIC EXCHANGE COPENHAGEN A/S",
        "finnhub_mic": "XCSE",
        "finnhub_timezone": "Europe/Copenhagen",
        "finnhub_hour": "09:00-17:00"
      },
      {
        "gfinance_code": "HEL",
        "gfinance_name": "NASDAQ OMX Helsinki",
        "finnhub_code": "HE",
        "finnhub_name": "NASDAQ OMX HELSINKI LTD",
        "finnhub_mic": "XHEL",
        "finnhub_timezone": "Europe/Helsinki",
        "finnhub_hour": "10:00-18:30"
      },
      {
        "gfinance_code": "ICE",
        "gfinance_name": "NASDAQ OMX Iceland",
        "finnhub_code": "IC",
        "finnhub_name": "NASDAQ OMX ICELAND",
        "finnhub_mic": "XICE",
        "finnhub_timezone": "Atlantic/Reykjavik",
        "finnhub_hour": "09:30-15:30"
      },
      {
        "gfinance_code": "IST",
        "gfinance_name": "Borsa Istanbul",
        "finnhub_code": "IS",
        "finnhub_name": "BORSA ISTANBUL",
        "finnhub_mic": "XIST",
        "finnhub_timezone": "Europe/Istanbul",
        "finnhub_hour": "09:40-18:10"
      },
      {
        "gfinance_code": "ELI",
        "gfinance_name": "Euronext Lisbon",
        "finnhub_code": "LS",
        "finnhub_name": "NYSE EURONEXT - EURONEXT LISBON",
        "finnhub_mic": "XLIS",
        "finnhub_timezone": "Europe/Lisbon",
        "finnhub_hour": "09:00-17:30"
      },
      {
        "gfinance_code": "LON",
        "gfinance_name": "London Stock Exchange",
        "finnhub_code": "L",
        "finnhub_name": "LONDON STOCK EXCHANGE",
        "finnhub_mic": "XLON",
        "finnhub_timezone": "Europe/London",
        "finnhub_hour": "08:00-16:30"
      },
      {
        "gfinance_code": "MCX",
        "gfinance_name": "Moscow Exchange",
        "finnhub_code": "ME",
        "finnhub_name": "MOSCOW EXCHANGE",
        "finnhub_mic": "MISX",
        "finnhub_timezone": "Europe/Moscow",
        "finnhub_hour": "09:30-19:00"
      },
      {
        "gfinance_code": "EPA",
        "gfinance_name": "Euronext Paris",
        "finnhub_code": "PA",
        "finnhub_name": "NYSE EURONEXT - MARCHE LIBRE PARIS",
        "finnhub_mic": "XPAR",
        "finnhub_timezone": "Europe/Paris",
        "finnhub_hour": "09:00-17:30"
      },
      {
        "gfinance_code": "RSE",
        "gfinance_name": "NASDAQ OMX Riga",
        "finnhub_code": "RG",
        "finnhub_name": "NASDAQ OMX RIGA",
        "finnhub_mic": "XRIS",
        "finnhub_timezone": "Europe/Riga",
        "finnhub_hour": "09:00-16:30"
      },
      {
        "gfinance_code": "STO",
        "gfinance_name": "NASDAQ OMX Stockholm",
        "finnhub_code": "ST",
        "finnhub_name": "NASDAQ OMX NORDIC STOCKHOLM",
        "finnhub_mic": "XSTO",
        "finnhub_timezone": "Europe/Stockholm",
        "finnhub_hour": "08:00-18:00"
      },
      {
        "gfinance_code": "TAL",
        "gfinance_name": "NASDAQ OMX Tallinn",
        "finnhub_code": "TL",
        "finnhub_name": "NASDAQ OMX TALLINN",
        "finnhub_mic": "XTAL",
        "finnhub_timezone": "Europe/Tallinn",
        "finnhub_hour": "09:00-16:30"
      },
      {
        "gfinance_code": "VIE",
        "gfinance_name": "Vienna Stock Exchange",
        "finnhub_code": "VI",
        "finnhub_name": "Vienna Stock Exchange",
        "finnhub_mic": "XWBO",
        "finnhub_timezone": "Europe/Vienna",
        "finnhub_hour": "09:04-17:30"
      },
      {
        "gfinance_code": "VSE",
        "gfinance_name": "NASDAQ OMX Vilnius",
        "finnhub_code": "VS",
        "finnhub_name": "NASDAQ OMX VILNIUS",
        "finnhub_mic": "XLIT",
        "finnhub_timezone": "Europe/Vilnius",
        "finnhub_hour": "09:00-16:30"
      },
      {
        "gfinance_code": "WSE",
        "gfinance_name": "Warsaw Stock Exchange",
        "finnhub_code": "WA",
        "finnhub_name": "WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET",
        "finnhub_mic": "XWAR",
        "finnhub_timezone": "Europe/Warsaw",
        "finnhub_hour": "08:30-17:05"
      },
      {
        "gfinance_code": "SWX",
        "gfinance_name": "SIX Swiss Exchange",
        "finnhub_code": "SW",
        "finnhub_name": "SWISS EXCHANGE",
        "finnhub_mic": "XSWX",
        "finnhub_timezone": "Europe/Zurich",
        "finnhub_hour": "09:30-17:00"
      }
    ]
  }