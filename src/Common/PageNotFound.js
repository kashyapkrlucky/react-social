import React from 'react';
import NavHeader from '../Common/NavHeader';
import { HeightPage } from '../Common/CardSizes';

function PageNotFound() {
    return (

        <React.Fragment>
            <NavHeader />
            <div className="flex flex-col justify-center items-center" style={{ height: HeightPage }}>
                <h1>404</h1>
                <p>No found...</p>
            </div>
        </React.Fragment >
    )
}

export default PageNotFound
