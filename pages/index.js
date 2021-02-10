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
  return {
    props: {
      constants
    }
  }
}

export default function Home( {constants} ) {
  return (
    <Layout>
      <div className={styles.styled_content}>
        <StockThumbnail constants={constants}></StockThumbnail>
      </div>
    </Layout>
  )
}
