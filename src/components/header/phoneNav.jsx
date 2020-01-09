import React from 'react';

class PhoneNav extends React.Component {
    render() {
        return (
            <div className={'phoneNav'}>
                <div className={'d-flex mb-3'} style={{padding: '15px 5px'}}>
                    <img src={'./images/phonenavicon.png'} alt={''}/>
                    <div className={'details'}>
                        <p><a href={'/'}>Realtor.com mobile apps</a></p>
                        <span>Find homes for sale or rent on <br/> iPhone, iPad, and Android</span>
                    </div>
                </div>
                <div className={'d-flex mb-3'} style={{padding: '15px 5px'}}>
                    <img src={'./images/realtor.jpg'} alt={''}/>
                    <div className={'details'}>
                        <p><a href={'/'}>Realtor.com Real Estate</a></p>
                        <div className={'d-flex'}>
                            <p><a href={'/'}>iOS</a></p>
                            <span>|</span>
                            <p><a href={'/'}>Android</a></p>
                        </div>
                    </div>
                </div>
                <div className={'d-flex mb-3'} style={{padding: '0px 5px'}}>
                    <img src={'./images/rental.jpg'} alt={''}/>
                    <div className={'details'}>
                        <p><a href={'/'}>Realtor.com Rentals</a></p>
                        <div className={'d-flex'}>
                            <p><a href={'/'}>iOS</a></p>
                            <span>|</span>
                            <p><a href={'/'}>Android</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PhoneNav