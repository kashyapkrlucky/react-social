import React from 'react';
import Cards from '../Common/Cards';
import Layout from './Layout';

function Groups() {
    return (
        <Layout>
            <div className='columns-auto w-full'>
                <h3 className='text-xl text-slate-600 mb-2 font-light'>My Groups</h3>
                <Cards>
                    <p className='text-center text-sm text-slate-300'>No Groups</p>
                </Cards>
            </div>
            <div className='columns-xl'>
            </div>
        </Layout>
    )
}

export default Groups
