'use client'
import React from 'react'
import Styles from './styles.module.css';
import ProgressBar from '../progressBar';
// import ProgressBar from '../progressBar';

interface IListBuilderProps {
    data: any[],
    label: string,
    value: string,
    showProgress: boolean,
    width?: string,
    onSelect: (e: any) => void
}

function ListBuilder({ data, onSelect, label, value, showProgress, width }: IListBuilderProps) {
  return (
    <div className={Styles.mainList} style={width ? {width: width} : {}}>
        {
            showProgress ?
                <ProgressBar />
            :
                data.map((d: any) => {
                    return <div key={d[value]} style={{width: "100%", cursor: "pointer"}}
                        className={Styles.categItem}
                        onClick={(e) => {
                            onSelect(d[value]);
                        }}>{d[label]}</div>
                })
        }
    </div>  )
}

export default ListBuilder;