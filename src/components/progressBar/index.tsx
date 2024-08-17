import React from 'react';
import Styles from './progressBar.module.css';

function ProgressBar() {
  return (
    <div className={Styles.progressBarContainer}>
        <div className={Styles.progressBarInnerContainer}>
            <div className={Styles.progressDiv}>
                <div className={Styles.progressDivInner}>
                </div>
            </div>
            <div className='labelDiv'>
                Fetching Data
            </div>
        </div>
    </div>
  )
}

export default ProgressBar;