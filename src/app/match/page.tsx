'use client'

import React, { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import './page.module.css';
import Styles from './page.module.css';

import { getDomainName } from '@/common/sharedCode/general';
import { IMatchDetails } from '@/common/interfaces/matches';
import { IQuestion } from '@/common/interfaces/questions';
import QuestionBuilder from '@/components/questionBuilder';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
 


function  Match ({ searchParams }: any) {

    const [ matchDetails, setMatchDetails ] = useState<IMatchDetails | undefined>(undefined);
    const [ questions, setQuestions ] = useState<IQuestion[]>([]);
    const [ matchCode, setMacthCode ] = useState<string>('');
    const refMatchCode = useRef<HTMLInputElement>(null);

    const getMatchDetails = (matchCode: string) => {
    
        let data: IMatchDetails | undefined;
    
        try {
            const domain = getDomainName();
    
            fetch(domain + '/api/matches?matchCode='+matchCode,
                {
                  method: 'get',
                  cache: "force-cache",
                })
                .then(res => {
                    return res.json();
    
                })
                .then(json => {                    
                    if(json.returnedStatus == 200) data = json.data[0];
                    setMatchDetails(data);
                    // setMacthCode(data?.mtch_unique_code!);

                })
                .catch(err => {
                    setMatchDetails(undefined);        

                })
    
        } catch(err) {
            console.log("Error: ", (err as any).message);        
            setMatchDetails(undefined);
        }
    }

    const validateDate = (startDate: string, timeToStart: number) => {
        const sDate = new Date(startDate);

        const timeDiff = new Date().getTime() - sDate.getTime();
        // const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); 

        // console.log(timeDiff + " milliseconds");
        // console.log(diffDays + " days");
        
        if(timeDiff <= timeToStart * 1000) return true;
        else return false;
        
    }

    useEffect(() =>  {
        setMacthCode(searchParams.code);

        // console.log(matchDetails);
    }, []);

    useEffect(() =>  {
        getMatchDetails(matchCode);
        // console.log(matchDetails);
    }, [ matchCode ]);

    useEffect(() => {
        

        if(matchDetails && matchDetails!.mtch_unique_code) {
            let unserQst = JSON.parse(matchDetails!.mtch_questions);

            let arrQ: IQuestion[] = [];

            unserQst.map((q: any) => {
                // console.log(q);

                let qst: IQuestion = {
                    qst_body: q.QST_body,
                    qst_id: q.QST_ID,
                    qst_category: q.QST_Category,
                    qst_answer1: q.QST_Answer1,
                    qst_answer2: q.QST_Answer2,
                    qst_answer3: q.QST_Answer3,
                    qst_answer4: q.QST_Answer4,
                    qst_correctAnswer: q.QST_CorrectAnswer
                }

                arrQ.push(qst);
            })

            setQuestions(arrQ);

        }

    }, [ matchDetails ]);
    
    return (
        <div>                        
            {
                matchCode == '' ? 
                    <div style={{width: "100%"}}>
                        <div style={{width: "100%"}}>
                            <Form>
                                <Form.Label style={{fontWeight: "bold"}}>Enter Match Code to join the match</Form.Label>
                                <Form.Control type="text" placeholder="Enter Match Code to join the match" ref={refMatchCode} />
                            </Form>                        
                        </div>
                        <div style={{textAlign: "right", margin: "10px"}}>
                            <ButtonGroup >
                                <Button variant="primary"
                                    onClick={() => {
                                        if(refMatchCode)
                                            setMacthCode(refMatchCode.current?.value!);    
                                    }}
                                >
                                    Join Match
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    : null
            }
            {
                matchDetails?.mtch_unique_code ? 
                    (
                        <div>
                            Match Status: {
                                matchDetails ? 
                                validateDate(matchDetails!.mtch_starting_time!.toString(), matchDetails?.mtch_time_to_join!) ? "Valid" : "Expired"
                                : null
                            }
                        </div>
                    )
                    : null
            }
            {
                matchDetails ? 
                    <div>
                        Match Name: {matchDetails ? matchDetails.mtch_name : 'No match code given'}
                    </div>
                    : null
            }
            <div>
                {
                    // questions.map(q => {
                    // return (
                        questions[0] ?  
                        <div >
                            {/* {q.qst_body} ({q.qst_correctAnswer}) */}
                            <QuestionBuilder question={questions[0]} />
                        </div>
                        : null
                //     )
                // })
                }
            </div>
        </div>
    )
}

export default Match;