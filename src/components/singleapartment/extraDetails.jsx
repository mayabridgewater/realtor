import React from 'react';

class ExtraDetails extends React.Component {
    render() {
        return (
            <div className={'customContainer details extraDetails'}>
                <div className={'row'}>
                    <div className={'col-md-6 col-lg-4 d-flex justify-content-between'}>
                        <p>Property Type </p>
                        <span>Single Family Home</span>
                    </div>
                    <div className={'col-md-6 col-lg-4 d-flex justify-content-between'}>
                        <p>Days on Realtor.com </p>
                        <span>5 Days</span>
                    </div>
                    {/*<div className={'d-none d-lg-block divideLine'}/>*/}
                    <div className={'col-md-6 col-lg-4 d-flex justify-content-between'}>
                        <p>Price per sqft</p>
                        <span>$705</span>
                    </div>
                    <div className={'col-md-6 col-lg-4 d-flex justify-content-between'}>
                        <p>Last Sold</p>
                        <span>$350K in 1999</span>
                    </div>
                    {/*<div className={'d-none d-lg-block divideLine'}/>*/}
                    <div className={'col-md-6 col-lg-4 d-flex justify-content-between'}>
                        <p>Year Built</p>
                        <span>1953</span>
                    </div>
                    <div className={'col-md-6 col-lg-4 d-flex justify-content-between'}>
                        <p>Garage</p>
                        <span>2 Car</span>
                    </div>
                </div>
                <div className={'btns'}>
                    <button className={'btn1'}>Ask a question</button>
                    <button className={'btn2'}>Share this home</button>
                </div>
            </div>
        )
    }
}

export default ExtraDetails