import React from 'react';
import NavHeader from '../Components/NavHeader';
import { PageStyle } from '../Common/CardStyles';

function PageNotFound() {
    return (

        <React.Fragment>
            <NavHeader />
            <div className="flex flex-col justify-center items-center" style={PageStyle}>
                <h1>404</h1>
                <p>No found...</p>
            </div>
        </React.Fragment >
    )
}

export default PageNotFound
