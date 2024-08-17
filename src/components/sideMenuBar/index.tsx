import React from 'react'
// import Styles from './styles.module.css'

import Link from 'next/link';
import Image from 'next/image';
import LargQuiztoferLogo from '@/../public/images/Quiztofer_Logo_Larg.png';

import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { MdOutlineSportsScore } from "react-icons/md";
import { MdLocalPlay } from "react-icons/md";



function SideMenuBar() {
    return (
        <div>
            <nav className="mainMenu">
                <div>
                    <Link href={"/"}>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", 
                                alignItems: "center", height: "10vh", width: "100%"}}>
                            <Image src={LargQuiztoferLogo} 
                                width={40}
                                alt={'Large Quiztofer Logo'} />
                        </div>
                     </Link>
                </div>


                {/* <div className="settings"></div> */}
                <div className="scrollbar" id="style-1">
                    <ul>
                        <li>
                            <Link href={"/"}>
                                <i className="fa fa-home fa-lg"></i><span className="nav-text">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <i className="fa fa-user fa-lg"></i><span className="nav-text">Login</span>
                            </Link>
                        </li>
                        
                        
                        <li className="darkerlishadow">
                            <Link href={"/manageQuestionsCategories"} style={{textDecoration: "none"}}>
                                <i className="fa fa-list"></i>
                                <span className="nav-text">Subjects Manager</span>
                            </Link>
                        </li>
                        <li className="darkerli">
                            <Link href={"/manageQuestions"} style={{textDecoration: "none"}}>
                                <i className="fa fa-question-circle"></i>
                                <span className="nav-text">Questions Manager</span>
                            </Link>
                        </li>

                        <li className="darkerli">
                            <Link href={"/createMatch"} style={{textDecoration: "none"}}>
                                <i className="fa fa-bolt"></i>
                                <span className="nav-text">Create Match</span>
                            </Link>
                        </li>

                        <li className="darkerli">
                            <Link href={"/match"} style={{textDecoration: "none"}}>
                                <i className="fa fa-sign-in"></i>
                                <span className="nav-text">Join Match</span>
                            </Link>
                        </li>

                        {/* <li className="darkerli">
                            <a href="http://startific.com">
                                <i className="fa fa-microphone fa-lg"></i>
                                <span className="nav-text">Film & Music</span>
                            </a>
                        </li>

                        <li className="darkerli">
                            <a href="http://startific.com">
                                <i className="fa fa-flask fa-lg"></i>
                                <span className="nav-text">Web Tools</span>
                            </a>
                        </li>

                        <li className="darkerli">
                            <a href="http://startific.com">
                                <i className="fa fa-picture-o fa-lg"></i>
                                <span className="nav-text">Art & Design</span>
                            </a>
                        </li>

                        <li className="darkerli">
                            <a href="http://startific.com">
                                <i className="fa fa-align-left fa-lg"></i>
                                <span className="nav-text">Magazines</span>
                            </a>
                        </li>

                        <li className="darkerli">
                            <a href="http://startific.com">
                                <i className="fa fa-gamepad fa-lg"></i>
                                <span className="nav-text">Games</span>
                            </a>
                        </li>

                        <li className="darkerli">
                            <a href="http://startific.com">
                                <i className="fa fa-glass fa-lg"></i>
                                <span className="nav-text">Life & Style</span>
                            </a>
                        </li>

                        <li className="darkerlishadowdown">
                            <a href="http://startific.com">
                                <i className="fa fa-rocket fa-lg"></i>
                                <span className="nav-text">Fun</span>
                            </a>
                        </li> */}
                    </ul>


                    {/* <li>

                        <a href="http://startific.com">
                            <i className="fa fa-question-circle fa-lg"></i>
                            <span className="nav-text">Help</span>
                        </a>
                    </li> */}

                    <ul className="logout">
                        
                        <li>
                            <a href="http://startific.com">
                                <i className="fa fa-info"></i>
                                <span className="nav-text">
                                    Helpdesk
                                </span>

                            </a>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <i className="fa fa-envelope-o fa-lg"></i><span className="nav-text">Contact</span>
                            </Link>
                        </li>

                        {/* <li>
                            <a href="http://startific.com">
                                <i className="fa fa-heart-o fa-lg"></i>
                                <span className="share">
                                    <div className="addthis_default_style addthis_32x32_style">
                                        <div style={{position: "absolute", marginLeft: "56px", top: "3px"}}>
                                            <a href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank" className="share-popup">
                                                <img src="http://icons.iconarchive.com/icons/danleech/simple/512/facebook-icon.png" width="30px" height="30px" />
                                            </a>
                                            <a href="https://twitter.com/share" target="_blank" className="share-popup">
                                                <img src="https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/Twitter_alt.png" width="30px" height="30px" />
                                            </a>
                                            <a href="https://plusone.google.com/_/+1/confirm?hl=en&url=_URL_&title=_TITLE_" target="_blank" className="share-popup">
                                                <img src="http://icons.iconarchive.com/icons/danleech/simple/512/google-plus-icon.png" width="30px" height="30px" />
                                            </a>
                                        </div>

                                        <script type="text/javascript">var addthis_config = {"data_track_addressbar":true};</script>
                                        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4ff17589278d8b3a"></script>
                                    </div>

                                </span>
                                <span className="twitter"></span>
                                <span className="google"></span>
                                <span className="fb-like">
                                    <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Ffacebook.com%2Fstartific&amp;width&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:35px;" allowTransparency="true"></iframe>
                                </span>
                                <span className="nav-text">

                                </span>

                            </a>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default SideMenuBar