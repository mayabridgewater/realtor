import React from 'react';

class Ads extends React.Component {
    render() {
        return (
            <div id={'ads'} className={'container'}>
                <div className={'slider'}>
                    <div className={'slideMain'}>
                        <div className={'adImg'} style={{backgroundImage: 'url(./images/ad1.jpg)'}}>
                            <div className={'adHeader'}>
                                <p>HOME IMPROVEMENT</p>
                            </div>
                        </div>
                        <div className={'title'}>
                            <p>The Weeks Hottest Bedroom Decor on Instagram Will Make You Want to T...</p>
                        </div>
                    </div>
                    <div className={'slideMain'}>
                        <div className={'adImg'} style={{backgroundImage: 'url(./images/ad2.jpg)'}}>
                            <div className={'adHeader'}>
                                <p>TRENDS</p>
                            </div>
                        </div>
                        <div className={'title'}>
                            <p>8 Ridiculous Items Marie Kondo Wants You to Clutter Your Home With</p>
                        </div>
                    </div>
                    <div className={'slideMain'}>
                        <div className={'adImg'} style={{backgroundImage: 'url(./images/ad3.jpg)'}}>
                            <div className={'adHeader'}>
                                <p>HOME IMPROVEMENT</p>
                            </div>
                        </div>
                        <div className={'title'}>
                            <p>The Property Brothers Put a Living Room in a Surprising Place for a S...</p>
                        </div>
                    </div>
                    <div className={'slideMain'}>
                        <div className={'adImg'} style={{backgroundImage: 'url(./images/ad4.jpg)'}}>
                            <div className={'adHeader'}>
                                <p>SPONSORED CONTENT</p>
                            </div>
                        </div>
                        <div className={'title'}>
                            <p>The 5 Biggest Mistakes Veteran and Military Home Buyers Make</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ads