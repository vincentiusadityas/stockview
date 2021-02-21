import Layout from '../components/layout'
import styles from '../styles/About.module.scss'
import { Col, Row } from 'react-bootstrap'

export default function About() {
    return (
      <Layout>
        <div className={styles.styled_content}>
            <Row className={styles.about_row}>
                <Col lg={4} md={4} sm={4} className={styles.about_title}>
                    <h3>About StockView</h3>
                </Col>
                <Col lg={8} md={8} sm={8} className={styles.about_descr}>
                    <p>
                        A simple web app to show stock data.
                    </p>
                    <p>
                        A personal project developed by {' '}
                        <span>
                            <a href="https://vincentiusadityas.dev" target="_blank" className={styles.about_link}>vincentiusadityas.dev</a>
                        </span>
                    </p>
                    <p>
                        Made using 
                        <a href="https://nextjs.org/" target="_blank" className={styles.about_link}>{' '} Next.js {' '}</a> and 
                        <a href="https://react-bootstrap.github.io/" target="_blank" className={styles.about_link}>{' '} react-bootstrap</a>
                    </p>
                </Col>
            </Row>
            <Row className={styles.about_row}>
                <Col lg={4} md={4} sm={4} className={styles.about_title}>
                    <h4>API Used</h4>
                </Col>
                <Col lg={8} md={8} sm={8} className={styles.about_api}>
                    <ol>
                        <li>
                            <a href="https://support.google.com/docs/answer/3093281#" target="_blank" className={styles.about_link}>Google Finance</a>
                        </li>
                        <li>
                            <a href="https://developers.google.com/sheets/api" target="_blank" className={styles.about_link}>Google Sheets API</a>
                            <span> 
                                {' '} with this wrapper {' '} 
                                <a href="https://github.com/theoephraim/node-google-spreadsheet" target="_blank" className={styles.about_link}>google-spreadsheet</a>
                            </span>
                        </li>
                        <li>
                            <a href="https://finnhub.io/" target="_blank" className={styles.about_link}>finnhub.io</a>
                        </li>
                        <li>
                            <a href="https://ipinfo.io/" target="_blank" className={styles.about_link}>ipinfo.io</a>
                        </li>
                    </ol>
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={4} sm={4} className={styles.about_title}>
                    <h4>Source</h4>
                </Col>
                <Col lg={8} md={8} sm={8} className={styles.about_source}>
                    <p>
                        Source Code  
                        <a href="https://github.com/vincentiusadityas/stockview" target="_blank" className={styles.about_link}>{' '} here</a> 
                    </p>
                    <p>
                        Take a look of the spreadsheet   
                        <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vR7VIlkqf3uwbLRoBIxQMiBHej29iT4hG7MOc7yD_Hv2c_clo7IrkcQlybHUSQh3bNQh5zv3FqjLwrH/pubhtml" target="_blank" className={styles.about_link}>{' '} here</a> 
                    </p>
                </Col>
            </Row>
        </div>
      </Layout>
    )
  }