import React from 'react';

class InfoBox extends React.Component {
    render() {
        const {beds, baths, sqft, address, label, country, description, length} = this.props;
        return (
            <div className={'infoBox'}>
                <div className={'d-flex'}>
                    {beds ? <p><span className={'bold'}>{beds}</span> Bed</p> : <p>{label}</p>}
                    {baths ? <p><span className={'bold'}>{baths}</span> Bath</p> : <p>{country}</p>}
                    {sqft ? <p><span className={'bold'}>{sqft}</span> Sqft</p> : <p>{description}</p>}
                </div>
                <div className={'d-flex justify-content-between'}>
                    <p>{address}</p>
                    {length > 4 && <button className={'agentBtn'}>Email Agent</button>}
                </div>
            </div>
        )
    }
}

export default InfoBox