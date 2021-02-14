import styles from './Stock.module.scss'
import React, {useState} from 'react'
import { Container, Row, Col, Card, Form, Spinner, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { getStockList, getProfile, getThumbnailData } from '../lib/stock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

export function StockThumbnail({ constants }) {
    const regions = constants["EXCHANGES_REGIONS"]

    const [selectedRegion, setSelectedRegion] = useState("")    // will be a string
    const [securities, setSecurities] = useState([])
    const [selectedSecurity, setSelectedSecurity] = useState({})    // will be a dictionary
    const [selectedSecurityIdx, setSelectedSecurityIdx] = useState("-1")
    const [selectedStock, setSelectedStock] = useState(null)

    // const { data: stockList, isLoading: isLoadingStockList } = getStockList(selectedSecurity? selectedSecurity.finnhub_code : null)
    const [stockList, setStockList] = useState([])
    const [isLoadingStockList, setIsLoadingStockList] = useState(false)
    // const { data: stockList, isLoading: isLoadingStockList } = getStockList(selectedSecurity)
    
    // const { data: stock, isLoading: isLoadingStock } = getProfile(selectedStock)
    const [stockProfile, setStockProfile] = useState({})
    const [isLoadingStockProfile, setIsLoadingStockProfile] = useState(false)

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
        if (event.target.value == "") {
            // setShouldFetchData(false)
        } else {
            setSelectedStock(event.target.value)
            // setShouldFetchData(true)
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
        
        const { data: profileData, isLoading } = await getProfile(selectedStock)
        const { data, isLoading: isLoadingThumbnailData } = await getThumbnailData(selectedSecurity, selectedStock)

        setStockProfile(profileData)
        setIsLoadingStockProfile(isLoading)

    }, [selectedStock])

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
                            {isLoadingStockProfile ?
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
                                            {stockProfile && Object.keys(stockProfile).length !== 0 ?
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