import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Index.module.css'
import {StockThumbnail} from '../components/stock'
import { getAllConstants } from '../lib/constants'

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export async function getStaticProps() {
  const constants = getAllConstants()

  const ipinfo_request = await fetch(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`)
  const ipinfo_json = await ipinfo_request.json()
  const country = ipinfo_json.country

  return {
    props: {
      constants,
      country
    }
  }
}

export default function Home( { constants, country } ) {
  return (
    <Layout>
      <div className={styles.styled_content}>
        <StockThumbnail constants={constants} country={country}></StockThumbnail>
      </div>
    </Layout>
  )
}
