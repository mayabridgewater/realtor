import React from 'react';

class InfoBox extends React.Component {
    render() {
<<<<<<< HEAD
        const {beds, baths, sqft, address, city, country, description, length} = this.props;
=======
        const {beds, baths, sqft, address, city, country, description} = this.props;
>>>>>>> 2fcdedd5eca259d68d672d161673639df54b68ac
        return (
            <div className={'infoBox'}>
                <div className={'d-flex'}>
                    <p><span className={'bold'}>{beds}</span> Bed</p>
                    <p><span className={'bold'}>{baths}</span> Bath</p>
                    <p><span className={'bold'}>{sqft}</span> Sqft</p>
                </div>
                <div className={'d-flex justify-content-between'}>
<<<<<<< HEAD
                    <p>{address} {city}, {country}</p>
                    {length > 4 && <button className={'agentBtn'}>Email Agent</button>}
=======
                    <p>{address}</p> <p>{city}, {country}</p>
>>>>>>> 2fcdedd5eca259d68d672d161673639df54b68ac
                </div>
            </div>
        )
    }
}

export default InfoBox