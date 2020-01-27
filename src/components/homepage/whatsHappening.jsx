import React from 'react';

class WhatsHappening extends React.Component {
    render() {
        return (
            <div className={'container cityInfo'}>
                <h1>What's New on Realtor.com</h1>
                <div className={'row info'}>
                    <div className={'test col-6 col-md-3'}>
                        <p className={'statNum'}>{this.props.numOfAvail}</p>
                        <p className={'statText'}>Homes for Sale</p>
                    </div>
                    <div className={'test col-6 col-md-3'}>
                        <p className={'statNum'}>9</p>
                        <p className={'statText'}>Open Houses</p>
                    </div>
                    <div className={'test col-6 col-md-3'}>
                        <p className={'statNum'}>184</p>
                        <p className={'statText'}>Recently Sold</p>
                    </div>
                    <div className={'test col-6 col-md-3'}>
                        <p className={'statNum'}>45</p>
                        <p className={'statText'}>Priced Reduced</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhatsHappening