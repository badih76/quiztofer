'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { Offcanvas } from 'react-bootstrap';

import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { MdOutlineSportsScore } from "react-icons/md";
import { MdLocalPlay } from "react-icons/md";

import Styles from './styles.module.css';

import LargQuiztoferLogo from '@/../public/images/Quiztofer_Logo_Larg.png';
import QuiztoferTitleSmall from '@/../public/images/Quiz-toferTitleSmall.png';
import Link from 'next/link';


function QuiztoferHeader() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div className={Styles.headerContainer}>

        {/* <div id="burgerMenuButton" 
            className={Styles.burgerBlock}>
            <GiHamburgerMenu 
                onClick={() => { 
                    // alert('You clicked the burger!');
                    handleShow();
                }}
            />
        </div> */}

        <div id="smallLogo" className={Styles.logoBlock}>
            <Link href={"/"}>
                <Image src={LargQuiztoferLogo} 
                    width={75}
                    alt={'Large Quiztofer Logo'} />
            </Link>
        </div>

        <div id="title" className={Styles.titleBlock}>
            <Image src={QuiztoferTitleSmall} 
                width={350}
                alt={'Quiztofer Title'} />
        </div>

        <div id="buttons" 
            className={Styles.buttonsBlock}>
            <div style={{width: "100%"}}>
                <Button variant='primary'
                    style={{width: "100%"}}>Login</Button>
            </div>
            <div style={{width: "100%"}}>
                <Button variant='link'
                    style={{width: "100%"}}>Sign-up</Button>
            </div>
        </div>

        <Offcanvas show={show} onHide={handleClose} style={{width: "350px"}}>
            <div style={{backgroundColor: "pink", height: "100%"}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ width: "100%" }}>
                        <div className={Styles.offCanvasTitleContainer}>
                            <div className={Styles.offCanvasTitleLogo}>
                                <Image src={LargQuiztoferLogo} 
                                    width={30}
                                    alt={'Quiztofer Logo'} />
                            </div>
                            <div className={Styles.offCanvasTitleQiztofer}>
                                <Image src={QuiztoferTitleSmall} 
                                    width={100}
                                    alt={'Quiztofer Title'} />
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={Styles.offCanvasMenuContainer}>
                        <Link href={"/"} style={{textDecoration: "none"}} 
                            onClick={() => handleClose() }>
                            <div className={Styles.offCanvasMenuItem}>
                                <div className={Styles.offCanvasMenuItemElement}>
                                    <IoHome />
                                </div>
                                <div className={Styles.offCanvasMenuItemElement} style={{fontSize: "1.2em"}}>
                                    Home
                                </div>
                            </div>
                        </Link>

                        <Link href={"/manageQuestionsCategories"} style={{textDecoration: "none"}}
                            onClick={() => handleClose() }>
                            <div className={Styles.offCanvasMenuItem}>
                                <div className={Styles.offCanvasMenuItemElement}>
                                    <BiSolidCategory />
                                </div>
                                <div className={Styles.offCanvasMenuItemElement} style={{fontSize: "1.2em"}}>
                                    Subjects Manager
                                </div>
                            </div>
                        </Link>

                        <Link href={"/manageQuestions"} style={{textDecoration: "none"}}
                            onClick={() => handleClose() }>
                            <div className={Styles.offCanvasMenuItem}>
                                <div className={Styles.offCanvasMenuItemElement}>
                                    <MdOutlineQuestionAnswer />
                                </div>
                                <div className={Styles.offCanvasMenuItemElement} style={{fontSize: "1.2em"}}>
                                    Questions Manager
                                </div>
                            </div>
                        </Link>

                        <Link href={"/createMatch"} style={{textDecoration: "none"}}
                            onClick={() => handleClose() }>
                            <div className={Styles.offCanvasMenuItem}>
                                <div className={Styles.offCanvasMenuItemElement}>
                                    <MdOutlineSportsScore size={20}/>
                                </div>
                                <div className={Styles.offCanvasMenuItemElement} style={{fontSize: "1.2em"}}>
                                    Create New Quiz Match
                                </div>
                            </div>
                        </Link>

                        <Link href={"/match"} style={{textDecoration: "none"}}
                            onClick={() => handleClose() }>
                            <div className={Styles.offCanvasMenuItem}>
                                <div className={Styles.offCanvasMenuItemElement}>
                                    <MdLocalPlay />
                                </div>
                                <div className={Styles.offCanvasMenuItemElement} style={{fontSize: "1.2em"}}>
                                    Join & Play Match
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                </Offcanvas.Body>
            </div>
        </Offcanvas>
    </div>
  )
}

export default QuiztoferHeader;