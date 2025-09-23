import './Home.css'
import { useState } from 'react';
import Lounge from '../layout/Lounge';

function Home() {
    const [page, setPage] = useState('')
    return(
        <div className="--container-grid-home">
            <div className="--container-grid-groups"></div>
            <div className="--container-grid-dms"></div>
            <div className="--container-grid-account"></div>
            <div className="--container-grid-header"></div>
            <div className="--container-grid-page">
                <div className="--grid-page">
                    <Lounge />  
                </div>
            </div>
        </div>
    )
}

export default Home;