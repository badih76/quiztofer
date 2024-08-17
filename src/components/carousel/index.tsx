'use client'

import Carousel from "react-multi-carousel";
import Styles from './styles.module.css';

import Image from 'next/image';
import LargQuiztoferLogo from '@/../public/images/Quiztofer_Logo_Larg.png';
import BrainMadeOf from '@/../public/images/Barin.png';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.

      },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

function UncontrolledExample() {
  return (
    <div className='row' >
        <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={7000}
            keyBoardControl={true}
            // customTransition="animation 300ms fadeInOut"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
            dotListClass="custom-dot-list-style"
            // itemClass="carousel-item-padding-40-px"
        >
            {/* <div style={{height: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Image src={LargQuiztoferLogo} 
                    width={350}
                    alt={'Large Quiztofer Logo'} />    
            </div> */}
            <div style={{height: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} 
                className={Styles.noSelection}>
                <div className="row">
                    {/* <div className="col col-md-1"></div> */}
                    <div className="col col-md-6">
                        <Image src={LargQuiztoferLogo} 
                            width={350}
                            alt={'Large Quiztofer Logo'} />  
                    </div>
                    <div className="col col-md-6" style={{display: "flex", flexDirection: "column", 
                        justifyContent: "center", alignItems: "center"}}>
                        <h1>Welcome to Quiztofer.</h1>
                        <h3>The ultimate quiz platform for geniouses and nerds. 🤓</h3>
                    </div>
                    {/* <div className="col col-md-1"></div> */}
                </div>
            </div>
            <div style={{height: "500px", display: "flex", flexDirection: "column", justifyContent: "center", 
                alignItems: "center", paddingLeft: "150px", paddingRight: "150px"}}
                className={Styles.noSelection}>
                    <div className="row">
                        {/* <div className="col col-md-1"></div> */}
                        <div className="col col-md-6">
                            <Image src={BrainMadeOf} 
                                width={350}
                                alt={'Large Quiztofer Logo'} />  
                        </div>
                        <div className="col col-md-6" style={{display: "flex", flexDirection: "column", 
                            justifyContent: "center", alignItems: "center"}}>
                            <h1>Ready for the Challenge?</h1>
                            <h3>Gather your friends, classmates and family members for a great challenge and show them what your brain 🧠 is made of.</h3>
                        </div>
                    </div>
            </div>
            <div style={{height: "500px", display: "flex", justifyContent: "center", alignItems: "center"}}
                className={Styles.noSelection}>
                <h1>Enjoy! 😊</h1>
            </div>
        </Carousel>
    </div>
  );
}

export default UncontrolledExample;