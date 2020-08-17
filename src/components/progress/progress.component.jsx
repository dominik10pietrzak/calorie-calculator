import React, { useEffect } from 'react';
import './progress.styles.scss';


const Progress = ({currentTab}) => {
    return(
        <div className="progress">
            <span id='basic'>Dane</span>
            <span id='activity'>Aktywność</span>
            <span id='target'>Cel</span>
        </div>
    )
}

export default Progress;