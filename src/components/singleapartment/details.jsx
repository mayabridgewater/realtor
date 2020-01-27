import React from 'react';

import {getCityById, getCountryById} from '../dataFromToServer';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: null,
            city: null
        }
    }

    async componentDidMount() {
        const city = await getCityById(this.props.apartment[0].city_id);
        const country = await getCountryById(city[0].country_id);
        this.setState({
            country: country,
            city: city
        });
    }

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
                        <div className='d-flex'>
                            <p><span>{apartment[0].address},</span></p>
                            {this.state.city && this.state.country &&
                                <p><span> {this.state.city[0].city_name} {this.state.country[0].name}</span></p>
                            }
                        </div>
                    </div>
                    <div>
                        <div id={"map-container-google-2"} className={"z-depth-1-half map-container"}>
                            {this.state.city &&
                            <iframe src={`https://maps.google.com/maps?q=${this.state.city[0].city_name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    frameBorder={0}
                                    style={{border:0}} allowFullScreen
                                    title={'map'}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details
