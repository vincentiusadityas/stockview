This is a personal project developed by [vincentiusadtiyas.dev](https://vincentiusadityas.dev). It is made using [Next.js](https://nextjs.org/), bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About

StockView is a simple web app to fetch and show stock data.

The app is deployed [here]().

## API Used

Several APIs are used in this project.

- [Google Finance](https://support.google.com/docs/answer/3093281#) is used to get the stock data such as price open, price close, low, high, etc.
- [Google Sheets API](https://developers.google.com/sheets/api) is used to write google finance formula and read result from the google spreadsheet.
- [finnhub.io](https://finnhub.io/) is used to get the list of exchanges and stocks and get the company profile.
- [ipinfo.io](https://ipinfo.io/) is used to get the user's current location (country).

Take a look of the spreadsheet [here](https://docs.google.com/spreadsheets/d/e/2PACX-1vR7VIlkqf3uwbLRoBIxQMiBHej29iT4hG7MOc7yD_Hv2c_clo7IrkcQlybHUSQh3bNQh5zv3FqjLwrH/pubhtml)

## How To

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
