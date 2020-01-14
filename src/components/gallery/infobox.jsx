import React from 'react';

class InfoBox extends React.Component {
    render() {
        const {beds, baths, sqft, address, label, city, country, code, description} = this.props;
        return (
            <div className={'infoBox'}>
                <div className={'d-flex'}>
                    <p><span className={'bold'}>{beds}</span> Bed</p>
                    <p><span className={'bold'}>{baths}</span> Bath</p>
                    <p><span className={'bold'}>{sqft}</span> Sqft</p>
                </div>
                <div className={'d-flex justify-content-between'}>
                    <p>{address}</p> <p>{city}, {country}, {code}</p>
                    <button className={'agentBtn'}>Email Agent</button>
                </div>
            </div>
        )
    }
}

export default InfoBox