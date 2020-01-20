import React from 'react';

class Details extends React.Component {
    render() {
        const {apartment} = this.props;
        return (
            <div className={'customContainer details border-bottom'}>
                <div className={'d-flex justify-content-between'}>
                    <div className={'d-flex flex-column'}>
                        <h1>${apartment[0].price}</h1>
                        <div className={'d-flex'}>
                            <p><span>{apartment[0].number_of_room}</span> bed</p>
                            <p><span>{apartment[0].number_of_bath}</span> bath</p>
                            <p><span>{apartment[0].sqft}</span> sqft</p>
                        </div>
                        <p><span>{apartment[0].address},</span></p>
                        {/* </span> {city.label} {city.country}</p> */}
                    </div>
                    <div>
                        <div id={"map-container-google-2"} className={"z-depth-1-half map-container"}>
                            {/* <iframe src={`https://maps.google.com/maps?q=${city.label}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    frameBorder={0}
                                    style={{border:0}} allowFullScreen
                                    title={'map'}/> */}
                        </div>
                        <a href={'/'} className={'commute'}><p>Commute Time</p></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details
