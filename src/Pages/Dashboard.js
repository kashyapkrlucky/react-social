import React from 'react'
import NavHeader from '../Common/NavHeader';
import { HeightPage } from '../Common/CardSizes';

function Dashboard() {
    return (
        <React.Fragment>
            <NavHeader />
            <div className="flex flex-row justify-center items-center" style={{ height: HeightPage }}>
                Dashboard
            </div>
        </React.Fragment >
    )
}

export default Dashboard
