import styles from './Stock.module.scss'
import React, {useState} from 'react'
import { Container, Row, Col, Card, Form, Spinner, Badge } from 'react-bootstrap'
import { getSymbol, getProfile } from '../lib/stock'
import useSWR from 'swr'

export function StockThumbnail({ constants }) {
    const regions = constants["EXCHANGES_REGIONS"]

    const [selectedRegion, setSelectedRegion] = useState("")    // will be a string
    const [securities, setSecurities] = useState([])
    const [selectedSecurity, setSelectedSecurity] = useState({})    // will be a dictionary
    const [selectedSecurityIdx, setSelectedSecurityIdx] = useState("-1")
    const [selectedStock, setSelectedStock] = useState("")

    const { data: stockList, isLoading: isLoadingStockList } = getSymbol(selectedSecurity? selectedSecurity.finnhub_code : null)
    
    const { data: stock, isLoading: isLoadingStock } = getProfile(selectedStock)

    const handleSelectRegion = (event) => {
        setSelectedRegion(event.target.value)

    }

    const handleSelectSecurity = (event) => {
        console.log(constants["EXCHANGES"][selectedRegion][event.target.value])
        setSelectedSecurityIdx(event.target.value)
        setSelectedSecurity(constants["EXCHANGES"][selectedRegion][event.target.value])
    }

    const handleSelectStock = (event) => {
        console.log(event.target.value)
        setSelectedStock(event.target.value)
    }

    React.useEffect(() => {
        if (selectedRegion) {
            if (selectedRegion === "-1") {
                setSecurities([])
            } else {
                setSelectedSecurity({})
                setSelectedSecurityIdx("-1")
                setSecurities(constants["EXCHANGES"][selectedRegion])
            }
        } 
    }, [selectedRegion])

    React.useEffect(() => {
        if (stockList) {
            if (stockList.data) {
                // console.log("stock:", stocks.data)
            }
        } else {
            console.log("hehehe")
        }
    }, [stockList])

    React.useEffect(() => {
        if (stock) {
            console.log("STOCK:", stock.data)

        }
    }, [stock])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={7}>
                        <div className={styles.stock_thumb_input_container}>
                            {isLoadingStockList ?
                            <>
                                <div className={styles.spinner_overlay}></div>
                                <Spinner className={styles.stock_thumb_input_loading} animation="border" />                       
                            </>
                            :
                            <></>
                            }
                            <div className={styles.stock_thumb_row}>API: <span className={styles.stock_thumb_api}>finnhub.io</span>, <span className={styles.stock_thumb_api}>google finance</span></div>
                            <Form.Row className={styles.stock_thumb_row}>
                                <Col lg={3} className={styles.stock_thumb_col}>
                                    <Form.Label className={styles.stock_thumb_label}>Region</Form.Label>
                                    <Form.Control className={styles.stock_thumb_form_control} size="sm" as="select" onChange={handleSelectRegion}>
                                        <option value="-1">Choose...</option>
                                        {regions.map((item, idx) => {
                                            return <option value={item} key={idx}>{item}</option>
                                        })}
                                    </Form.Control>
                                </Col>
                                <Col lg={9}>
                                    <Form.Label className={styles.stock_thumb_label}>Security</Form.Label>
                                    <Form.Control className={styles.stock_thumb_form_control} size="sm" as="select" onChange={handleSelectSecurity} value={selectedSecurityIdx}>
                                        {securities.length === 0 ?
                                            <option value="-1">Choose Region First...</option>
                                            :
                                            <option value="-1">Choose Security...</option>
                                        }
                                        {securities.map((item, idx) => {
                                            return <option value={idx} key={idx}>{item.gfinance_name}</option>
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row className={styles.stock_thumb_row}>
                                <Col lg={12} className={styles.stock_thumb_col}>
                                    <Form.Label className={styles.stock_thumb_label}>Stock</Form.Label>
                                    <Form.Control className={styles.stock_thumb_form_control} size="sm" as="select" onChange={handleSelectStock}>
                                        {stockList && stockList.data ?
                                            stockList.data.length === 0 ?
                                            <option value="">Choose Security First...</option>
                                            :
                                            <option value="">Choose Stock...</option>
                                        :
                                        <option value="">Choose Security First...</option>
                                        }
                                        {stockList && stockList.data ?
                                            stockList.data.map((item, idx) => {
                                                return <option value={item.symbol} key={idx}>{item.description}</option>
                                            })
                                        :
                                        <></>
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                        </div>
                        <div className={styles.stock_thumb_card_container}>
                            {isLoadingStock ?
                            <>
                                <div className={styles.spinner_overlay}></div>
                                <Spinner className={styles.stock_thumb_card_loading} animation="border"/>                       
                            </>
                            :
                            <></>
                            }
                            <Card className={styles.stock_thumb_card}>
                                <Card.Body>
                                    {stock && stock.data && Object.keys(stock.data).length !== 0 ?
                                    <>
                                        <Card.Text>
                                            <div className={styles.stock_thumb_card_title}>
                                                {stock.data.name}
                                            </div>
                                            <div className={styles.stock_thumb_card_exchange}>
                                                {stock.data.exchange}
                                                <span className={styles.stock_thumb_card_industry}>
                                                    <Badge pill className={styles.stock_thumb_card_badge}>
                                                        {stock.data.finnhubIndustry}
                                                    </Badge>
                                                </span>
                                            </div>
                                        </Card.Text>
                                    </>
                                    :
                                        selectedStock ?
                                        <>
                                            <Card.Text>
                                                Could not fetch stock data...
                                            </Card.Text>
                                        </>
                                        :
                                        <>
                                            <Card.Text>
                                                Stock info will be shown here...
                                            </Card.Text>
                                        </>
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <Card className={styles.stock_thumb_currency_card}>
                            <Card.Header as="h5">Currencies</Card.Header>
                            <Card.Body>
                                <Card.Title>Special title treatment</Card.Title>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                    </Col>
                </Row> */}
            </Container>
        </>
    )
}