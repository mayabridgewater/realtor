import React from 'react';

class InfoBox extends React.Component {
    render() {
        const {beds, baths, sqft, address, city, country, description} = this.props;
        return (
            <div className={'infoBox'}>
                <div className={'d-flex info'}>
                    <p><span className={'bold'}>{beds}</span> Bed</p>
                    <p><span className={'bold'}>{baths}</span> Bath</p>
                    <p><span className={'bold'}>{sqft}</span> Sqft</p>
                </div>
                <div className={'d-flex justify-content-between info'}>
                    <div> 
                        <p>{address},</p>
                        <p>{city}, {country}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoBox