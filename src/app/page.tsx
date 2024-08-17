// 'use client'
// import Image from 'next/image'
import Styles from './page.module.css';
import Button from 'react-bootstrap/Button';
// import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';


// import the logos
// import LargQuiztoferLogo from '@/../public/images/Quiztofer_Logo_Larg.png';
import UncontrolledExample from '@/components/carousel';
// import QuiztoferHeader from '@/components/QuiztoferHeader';
import Link from 'next/link';
import SideMenuBar from '@/components/sideMenuBar';
// import Layout from './layout';

export default function Home() {
  return (
    <div className='row justify-content-md-center'>
      <div className='row justify-content-md-center'>
        <div className='col col-md-12' 
          // style={{border: "solid 1px lightgray", borderRadius: "15px"}}
        >
          <div className='row' 
            style={{height: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "5px", marginBottom: "2vw"}}>
            <UncontrolledExample />
          </div>
        </div>
      </div>
      <div className='row justify-content-md-center'>
        {/* <div 
          className={Styles.divBlock}
          >
          <Link href={"/createMatch"}>
            <Button variant="default">Create Quick Match</Button>
          </Link>
        </div>
        <div 
          className={Styles.divBlock}
          >          <Link href={"/manageQuestions"}>
            <Button variant="default">Manage Questions</Button>
          </Link>
        </div>
        <div 
          className={Styles.divBlock}
          >          <Link href={"/manageQuestionsCategories"}>
            <Button variant="default">Manage Questions Categories</Button>
          </Link>
        </div>         */}
      </div>
    </div>
  )
}
