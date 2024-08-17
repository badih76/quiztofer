'use client'

import React, { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import './page.module.css';
import Styles from './page.module.css';

import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import { IQstCaregories } from '@/common/interfaces/qstCategories';
import { getDomainName } from '@/common/sharedCode/general';

import { act } from 'react-dom/test-utils';
import { AccordionItemProps, Badge, Button, Card, Form } from 'react-bootstrap';

import QRCode from "react-qr-code";
import Link from 'next/link';

interface IMatchParams {
    category: number,
    qstCount: number,
    timeToJoin: number,
    timeToAnswer: number,
    matchName: string
}

const getMatchURL = (code: string) => {
    const domain = getDomainName();

    return domain + "/match?code=" + code;
}

const createMatch = (params: IMatchParams, setMatchCode: (mc: string) => any) => {
    // call API and pass the match params to receive the match details 
    try {
        const domain = getDomainName();

        const res = fetch(domain + '/api/createMatch',
            {
              method: 'post',
              cache: "force-cache",
              body: JSON.stringify(params)
            })
            .then(res => {
                return res.json();

            })
            .then(json => {
                let data: any;
                console.log(json);
                setMatchCode(json.data.code);
            })
            .catch (err => {
                console.log("Error: ", (err as any).message);
            });
    } catch(err) {
        console.log("Error: ", (err as any).message);
    }

}

function CreateMatch () {
    const [ qstCategories, setQstCategories ] = useState<any>();
    const [ selectedCategory, setSelectedCategory ] = useState<number>();
    const [ qstCountByID, setQstCountByID ] = useState<number>(0);
    const [ qstCountInMatch, setQstCountinMatch ] = useState<number>(0);
    const [ timeToJoin, setTimeToJoin ] = useState<number>(3);
    const [ timeToAnswerQst, setTimeToAnswerQst ] = useState<number>(1);
    const [ matchName, setMatchName ] = useState<string>('');
    const [ matchCode, setMatchCode ] = useState<string>('');

    const [ matchParams, setMatchParams ] = useState<IMatchParams>({
        category: 0, qstCount: 0, timeToJoin: 0, timeToAnswer: 0, matchName: ''
    });

    const refQstCountInMatch = useRef<HTMLInputElement>(null);
    const refTimeToJoin = useRef<HTMLInputElement>(null);
    const refTimeToAnswerQst = useRef<HTMLInputElement>(null);
    const refMatchName = useRef<HTMLInputElement>(null);
        

    interface ICustomeToggle {
        eventKey: string,
        children: ReactNode, 
        extraActions?: () => void
    }

    function CustomToggle({ children, eventKey, extraActions }: ICustomeToggle) {
        const nextEventKey = (parseInt(eventKey) + 1).toString();
        const decoratedOnClickNext = useAccordionButton(nextEventKey, () => {
            // console.log("Expand Next", eventKey);
            extraActions ? extraActions() : null;

        });
        const decoratedOnClick = useAccordionButton(eventKey, decoratedOnClickNext);

        // if(eventKey == '5') {
        //     extraActions!();
            
        // }

        return (
            <Button variant='primary' onClick={decoratedOnClick}>{children}</Button>
        
        );
      }

    function HeaderButton({ children, eventKey }: ICustomeToggle) {
        const decoratedOnClick = useAccordionButton(eventKey, () => {});
      
        return (
          <button
            type="button"
            className={Styles.headerButton}
            onClick={decoratedOnClick}
          >
            {children}
            
          </button>
        );
      }

    useEffect(()  => {
        setSelectedCategory(-1);
        const domain = getDomainName();

        try {
            const res = fetch(domain + '/api/qstCategories',
                {
                  method: 'get',
                  cache: "force-cache" 
                })
                .then(res => {
                    return res.json();

                })
                .then(json => {
                    let data: IQstCaregories[] = [];
                    
                    json.data.map((c: IQstCaregories) => {
                        data.push(c);
                    });

                    setQstCategories(data);
                    // console.log("JSON: ", json.data);
                })
                .catch (err => {
                    console.log("Error: ", (err as any).message);
                });
        } catch(err) {
            console.log("Error: ", (err as any).message);
        }

        // ((form.current!.elements as HTMLFormControlsCollection).namedItem(e.name) as HTMLInputElement).value = objData[e.name];
        (refQstCountInMatch.current! as HTMLInputElement).value = '0';
        (refTimeToJoin.current! as HTMLInputElement).value = '3';
        (refTimeToAnswerQst.current! as HTMLInputElement).value = '1';
        (refMatchName.current! as HTMLInputElement).value = '';

    }
    , []);

    useEffect(() => {
        const domain = getDomainName();

        try {
            fetch(`${domain}/api/questions/count?qstCatID=${selectedCategory}`,
                {
                  method: 'get',
                  cache: "no-cache" 
                })
                .then(res => {
                    return res.json();
    
                })
                .then(json => {
                    setQstCountByID(json.data);
                    
                })
                .catch (err => {
                    console.log("Error: ", (err as any).message);
                    setQstCountByID(0);
                });
        } catch(err) {
            console.log("Error: ", (err as any).message);
            setQstCountByID(0);
        }
    }, [selectedCategory])

    return (
        <div className='row justify-content-md-center'>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <HeaderButton eventKey='0'>
                            Step 1: Select the questions category
                            {
                                selectedCategory != -1 && qstCategories ? 
                                <div style={{display: "flex", flexDirection: "row", width: "100%", alignItems: "center"}}>
                                    <div style={{display: "flex", flexDirection: "column", width: "90%",}}>
                                        Selected category: { qstCategories[qstCategories.findIndex((c: IQstCaregories) => {
                                            // console.log(c); 
                                            return c.cat_id == selectedCategory})].cat_title }
                                    </div>
                                    <div style={{display: "flex", flexDirection: "column", width: "10%", alignItems: "end"}}>
                                        <div>
                                            <Badge pill bg='info'>{qstCountByID} qst</Badge>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                        </HeaderButton>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className={Styles.listContainer}>
                                <div className={Styles.qstCatLabel}> 
                                    Select the category of the question you want to include in the match.
                                </div>

                                <select id="qstCateg" style={{width: "100%", fontSize: "1em", border: "none", borderBottom: "solid 1px lightgray"}}
                                    onChange={(e) => {
                                        const selected = e.currentTarget.value;
                                        setSelectedCategory(parseInt(selected));
                                    }}
                                    >
                                        <option value={-1} className={Styles.listItem} style={{color: "gray"}}>Select questions category</option>
                                    {
                                        qstCategories?.map((c: IQstCaregories) => {
                                            return <option key={c.cat_id} className={Styles.listItem} value={c.cat_id}>{c.cat_title}</option>
                                        })
                                    }
                                </select>
                                
                                <div style={{padding: "10px 10px 0 10px", 
                                        display: "flex", flexDirection: "row", justifyContent: "flex-end", justifyItems: "center"}}>
                                    <CustomToggle eventKey='0'>Next</CustomToggle>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <HeaderButton eventKey='1'>Step 2: Specify how many questions in this match</HeaderButton>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <div className={Styles.listContainer}>
                            <Form.Control type='number' ref={refQstCountInMatch} 
                                id='txtQstCountInMatch' placeholder='Enter number of questions in this match' />

                            <div style={{padding: "10px 10px 0 10px", 
                                    display: "flex", flexDirection: "row", justifyContent: "flex-end", justifyItems: "center"}}>
                                <CustomToggle eventKey='1'
                                    extraActions={() => {
                                        // refQstCountInMatch.current ? refQstCountInMatch!.current!.value! : '0';

                                        setQstCountinMatch(parseInt(refQstCountInMatch.current!.value));
                                    }}>
                                    Next
                                </CustomToggle>
                            </div>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <HeaderButton eventKey='2'>Step 3: Specify the time limit to join</HeaderButton>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <div className={Styles.listContainer}>
                            <Form.Control type='number' ref={refTimeToJoin} 
                                id='txtTimeToJoin' placeholder='Enter the time in minutes for players to join' />

                            <div style={{padding: "10px 10px 0 10px", 
                                    display: "flex", flexDirection: "row", justifyContent: "flex-end", justifyItems: "center"}}>
                                <CustomToggle eventKey='2'
                                    extraActions={() => {
                                        setTimeToJoin(parseInt(refTimeToJoin.current!.value));
                                    }}>
                                    Next
                                </CustomToggle>
                            </div>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <HeaderButton eventKey='3'>Step 4: Specify the time allowed to asnwer a question</HeaderButton>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <div className={Styles.listContainer}>
                            <Form.Control type='number' ref={refTimeToAnswerQst} 
                                id='txtTimeToANswerQst' placeholder='Enter the time allowed in minutes for each question' />

                            <div style={{padding: "10px 10px 0 10px", 
                                    display: "flex", flexDirection: "row", justifyContent: "flex-end", justifyItems: "center"}}>
                                <CustomToggle eventKey='3'
                                    extraActions={() => {
                                        setTimeToAnswerQst(parseInt(refTimeToAnswerQst.current!.value));

                                    }}>
                                    Next
                                </CustomToggle>
                            </div>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <HeaderButton eventKey='4'>Step 5: Give you match a name</HeaderButton>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <div className={Styles.listContainer}>
                            <Form.Control type='text' ref={refMatchName} 
                                id='txtMatchName' placeholder='Enter the new match name here' onChange={
                                    (e) => {
                                        setMatchName(e.currentTarget.value);
                                    }
                                } />

                            <div style={{padding: "10px 10px 0 10px", 
                                    display: "flex", flexDirection: "row", justifyContent: "flex-end", justifyItems: "center"}}>
                                <CustomToggle eventKey='4'
                                    extraActions={() => {
                                        // setMatchName(refMatchName.current!.value);

                                        // console.log('Match Object 2: ', { selectedCategory, qstCountInMatch, timeToJoin, timeToAnswerQst, matchName });
                                    }}>
                                    Next
                                </CustomToggle>
                            </div>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <HeaderButton eventKey='5'>Step 6: Generate and share the match code</HeaderButton>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                    <Card.Body>
                        <div className={Styles.listContainer}>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', width: "100%"}}>
                                {
                                    matchCode != '' ? 
                                        <>
                                            <QRCode size={256}
                                                style={{ height: "auto", maxWidth: "15%", width: "15%" }}
                                                value={getMatchURL(matchCode)}
                                                viewBox={`0 0 50 50`} />
                                            <div>
                                                <Link href={getMatchURL(matchCode)}>
                                                    {getMatchURL(matchCode)}
                                                </Link>
                                            </div>
                                        </>
                                        : null
                                }
                                
                            </div>

                            <div style={{padding: "10px 10px 0 10px", 
                                    display: "flex", flexDirection: "row", justifyContent: "flex-end", justifyItems: "center"}}>
                                {/* <CustomToggle eventKey='5'
                                    extraActions={() => {
                                        const matchParams: IMatchParams = {
                                            category: selectedCategory!,
                                            qstCount: qstCountInMatch,
                                            timeToJoin: timeToJoin,
                                            timeToAnswer: timeToAnswerQst,
                                            matchName: matchName!
                                        }

                                        createMatch(matchParams);
                                    }}>
                                    Next</CustomToggle> */}
                                
                                <Button variant='primary' onClick={() => {
                                        const matchParams: IMatchParams = {
                                            category: selectedCategory!,
                                            qstCount: qstCountInMatch,
                                            timeToJoin: timeToJoin,
                                            timeToAnswer: timeToAnswerQst,
                                            matchName: matchName!
                                        }

                                        createMatch(matchParams, setMatchCode);
                                    }}
                                    disabled={matchCode != '' ? true : false}>Create Match</Button>
                            </div>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default CreateMatch