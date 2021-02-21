import Head from "next/head"
import Navbar from './navbar'
import React, {useState, useRef} from 'react'
import styles from './Layout.module.scss'

import { faGithub, faGitlab, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Layout({children}) {
    const [windowWidth, setWindowWidth] = useState(null)
    const [showNav, setShowNav] = useState(true)
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(windowWidth < 768)
    const [scrollPos, setScrollPos] = useState(0)
    const [navIsAtTop, setNavIsAtTop] = useState(true)
    const [hamburgerChecked, setHamburgerChecked] = useState(false)
    const rootRef = useRef()
    const contentRef = useRef()
    
    React.useEffect(() => {
        setWindowWidth(window.innerWidth)
    },[])

    const handleScroll = () => {
        setNavIsAtTop(window.scrollY==0)
        setScrollPos(document.body.getBoundingClientRect().top)
        setShowNav(hamburgerChecked || document.body.getBoundingClientRect().top > scrollPos)
    }

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('scroll', handleScroll)
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll])

    const handleResize = () => {
        setShowHamburgerMenu(window.innerWidth < 768)
    }

    React.useEffect(() => {
        if (showHamburgerMenu && hamburgerChecked) {
            document.body.style.overflow = "hidden"
            contentRef.current.style['filter'] = "blur(2px)"
        } else {
            document.body.style.overflow = "visible"
            contentRef.current.style['filter'] = "unset"
        }
    }, [hamburgerChecked])

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    const handleChecked = () => {
        setHamburgerChecked(!hamburgerChecked)
    }

    return (
        <>
            <Head>
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                <title>Stock View</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div id="root">
                <header>
                    <Navbar 
                        showNav={showNav} 
                        navIsAtTop={navIsAtTop} 
                        hamburgerMenu={showHamburgerMenu}
                        handleChecked={handleChecked}
                    >
                    </Navbar>
                </header>

                <div id="content" ref={contentRef}>
                    {children}
                </div>

                <footer className={styles.footer}>
                    <div className={styles.social_links}>
                        <ul>
                            <li>
                                <a href="https://github.com/vincentiusadityas" target="_blank">
                                    <FontAwesomeIcon icon={faGithub} size="2x" className={styles.social_icon}></FontAwesomeIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://gitlab.com/vasundjaja" target="_blank">
                                    <FontAwesomeIcon icon={faGitlab} size="2x" className={styles.social_icon}></FontAwesomeIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/vincentiusadityas/" target="_blank">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" className={styles.social_icon}></FontAwesomeIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/vincentiusadityas/" target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} size="2x" className={styles.social_icon}></FontAwesomeIcon>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <a
                            href="https://vincentiusadityas.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            VINCENTIUS ADITYA SUNDJAJA
                        </a>
                    </div>
                </footer>
            </div>
        </>
    )
}