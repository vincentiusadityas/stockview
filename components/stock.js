import styles from './Stock.module.scss'
import React, {useState} from 'react'
import { Container, Row, Col, Card, Form, Spinner, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { getStockList, getProfile, getThumbnailData } from '../lib/stock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart, faExpandAlt, faArrowDown, faArrowUp, faClock} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

export function StockThumbnail({ constants }) {
    const regions = constants["EXCHANGES_REGIONS"]

    const [selectedRegion, setSelectedRegion] = useState("")    // will be a string
    const [securities, setSecurities] = useState([])
    const [selectedSecurity, setSelectedSecurity] = useState({})    // will be a dictionary
    const [selectedSecurityIdx, setSelectedSecurityIdx] = useState("-1")
    const [selectedStock, setSelectedStock] = useState(null)

    const [stockList, setStockList] = useState([])
    const [isLoadingStockList, setIsLoadingStockList] = useState(false)
    
    const [stockProfile, setStockProfile] = useState({})
    const [isLoadingStockProfile, setIsLoadingStockProfile] = useState(false)

    const [stockData, setStockData] = useState({})
    const [isLoadingStockData, setIsLoadingStockData] = useState(false)

    const handleSelectRegion = (event) => {
        setSelectedRegion(event.target.value)

    }

    const handleSelectSecurity = (event) => {
        setSelectedSecurityIdx(event.target.value)
        setSelectedSecurity(constants["EXCHANGES"][selectedRegion][event.target.value])
    }

    const handleSelectStock = (event) => {
        if (event.target.value !== "") {
            setSelectedStock(event.target.value)
        }
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

    React.useEffect(async () => {
        setIsLoadingStockList(true)

        const { data, isLoading } = await getStockList(selectedSecurity)

        setStockList(data)
        setIsLoadingStockList(isLoading)
    }, [selectedSecurity])

    React.useEffect(async () => {
        setIsLoadingStockProfile(true)
        setIsLoadingStockData(true)

        const { data: profileData, isLoading } = await getProfile(selectedStock)
        const { data, type, isLoading: isLoadingThumbnailData } = await getThumbnailData(selectedSecurity, selectedStock)

        //TODO: show message depending on the type

        setStockProfile(profileData)
        setIsLoadingStockProfile(isLoading)

        setStockData(data)
        setIsLoadingStockData(isLoadingThumbnailData)

    }, [selectedStock])

    const getDataSign = (strNum) => {
        if (strNum !== "#N/A") {
            const num = parseFloat(strNum)
            if (num < 0) return "negative"
            else if (num > 0) return "positive"
            else return "neutral"
        } else {
            return strNum
        }
    }
    
    const convertToCurrency = (strNum) => {
        if (strNum === "#N/A") return strNum
        else return parseFloat(strNum).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    //TODO: SETUP REFRESH BUTTON for the thumbnail data
    //TODO: SHOW CURRENCIES DATA
    //TODO: FINDOUT the timezone for latest update
    //TODO: SETUP SHOW MORE THUMBNAIL DATA (MAYBE GRAPH)
    //TODO: SETUP SAVE STOCK AND SETUP A MY SAVED STOCK PAGE (use cache)
    //TODO: SETUP ABOUT PAGE AND CONTACT PAGE

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
                                        {stockList ?
                                            stockList.length === 0 ?
                                            <option value="">Choose Security First...</option>
                                            :
                                            <option value="">Choose Stock...</option>
                                        :
                                        <option value="">Choose Security First...</option>
                                        }
                                        {stockList ?
                                            stockList.map((item, idx) => {
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
                            {isLoadingStockProfile && isLoadingStockData ?
                            <>
                                <div className={styles.spinner_overlay}></div>
                                <Spinner className={styles.stock_thumb_card_loading} animation="border"/>                       
                            </>
                            :
                            <></>
                            }
                            <Card className={styles.stock_thumb_card}>
                                <Card.Body>
                                    <Row>
                                        <Col lg={10} md={10} sm={10}>
                                            {stockProfile && stockData && 
                                                Object.keys(stockProfile).length !== 0 &&
                                                Object.keys(stockData).length !== 0 ?
                                            <>
                                                <div className={styles.stock_thumb_card_title}>
                                                    <a
                                                        className={styles.stock_thumb_card_title_href}
                                                        href={stockProfile.weburl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {stockProfile.name}
                                                    </a>
                                                </div>
                                                <div className={styles.stock_thumb_card_exchange}>
                                                    {stockProfile.exchange}
                                                    <span className={styles.stock_thumb_card_industry}>
                                                        <Badge pill className={styles.stock_thumb_card_badge}>
                                                            {stockProfile.finnhubIndustry}
                                                        </Badge>
                                                    </span>
                                                </div>
                                                <div className={styles.stock_thumb_card_price}>
                                                    {convertToCurrency(stockData.price)}
                                                    <span className={styles.stock_thumb_card_currency}>{' ' + stockData.currency}</span>
                                                    <span className={styles.stock_thumb_card_pricec} data-sign={getDataSign(stockData.change)}>
                                                        {parseInt(stockData.change).toFixed(2) + " (" + stockData.changepct + "%)"}
                                                        <FontAwesomeIcon className={styles.stock_thumb_card_faArrowDown} icon={faArrowDown} size="sm"/>
                                                        <FontAwesomeIcon className={styles.stock_thumb_card_faArrowUp} icon={faArrowUp} size="sm"/>
                                                    </span>
                                                </div>
                                                <div className={styles.stock_thumb_card_latest_update}>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 50, hide: 50 }}
                                                        overlay={<Tooltip id="button-tooltip-1">
                                                                    The real-time data is delayed by {stockData.datadelay} mins.
                                                                 </Tooltip>}
                                                    >
                                                        <FontAwesomeIcon className={styles.stock_thumb_card_faClock} icon={faClock} size="sm"/>
                                                    </OverlayTrigger>
                                                    Latest Update: 
                                                    <span className={styles.stock_thumb_card_tradetime}>{" " + stockData.tradetime}</span>
                                                </div>
                                                <Row className={styles.stock_thumb_card_data}>
                                                    <Col>
                                                        <Row>
                                                            PREV CLOSE:
                                                            <span className={styles.stock_thumb_card_data_numbers}>{convertToCurrency(stockData.closeyest)}</span>
                                                        </Row>
                                                        <Row>
                                                            OPEN:
                                                            <span className={styles.stock_thumb_card_data_numbers}>{convertToCurrency(stockData.priceopen)}</span>
                                                        </Row>
                                                        <Row>
                                                            HIGH:
                                                            <span className={styles.stock_thumb_card_data_numbers}>{convertToCurrency(stockData.high)}</span>
                                                        </Row>
                                                        <Row>
                                                            LOW:
                                                            <span className={styles.stock_thumb_card_data_numbers}>{convertToCurrency(stockData.low)}</span>
                                                        </Row>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            VOLUME:
                                                            <span className={styles.stock_thumb_card_data_numbers}>{stockData.volume}</span>
                                                        </Row>
                                                        <Row>
                                                            MARKET CAP:
                                                            <span className={styles.stock_thumb_card_data_numbers}>{stockData.marketcap}</span>
                                                        </Row>
                                                        <Row>
                                                            P/E:
                                                            <span className={styles.stock_thumb_card_data_numbers}>{stockData.pe}</span>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </>
                                            :
                                                selectedStock ?
                                                <>
                                                    <Card.Text>
                                                        Stock data not found...
                                                    </Card.Text>
                                                </>
                                                :
                                                <>
                                                    <Card.Text>
                                                        Stock info will be shown here...
                                                    </Card.Text>
                                                </>
                                            }
                                        </Col>
                                        {stockProfile && Object.keys(stockProfile).length !== 0 ?
                                        <>
                                            <Col lg={1} md={1} sm={1} className={styles.stock_thumb_card_icon_col}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 50, hide: 50 }}
                                                    overlay={<Tooltip id="button-tooltip-1">Click to save this stock!</Tooltip>}
                                                >
                                                    <div>
                                                        <FontAwesomeIcon className={styles.stock_thumb_card_save + ' ' + styles.stock_thumb_card_faHeart} icon={farHeart} size="lg"/>
                                                        <FontAwesomeIcon className={styles.stock_thumb_card_save_solid + ' ' + styles.stock_thumb_card_faHeart} icon={fasHeart} size="lg"/>
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>
                                            <Col lg={1} md={1} sm={1} className={styles.stock_thumb_card_icon_col}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 50, hide: 50 }}
                                                    overlay={<Tooltip id="button-tooltip-2">Click to view more details!</Tooltip>}
                                                >
                                                    <FontAwesomeIcon icon={faExpandAlt} className={styles.stock_thumb_card_faExpandAlt} size="lg"/>
                                                </OverlayTrigger>
                                            </Col>
                                        </>
                                        :
                                        <></>
                                        }
                                    </Row>
                                    
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