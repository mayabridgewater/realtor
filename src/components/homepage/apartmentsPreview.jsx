import React from 'react';

import {getApartmentsFromServer} from '../../api/dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';

export default class ApartmentsPreview extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: []
        }
    }

    async componentDidMount() {
        const query = {availability: 'available', status: 'approved', size: 4}
        const apartments = await getApartmentsFromServer(query);
        this.setState({
            apartments: apartments.apartments
        })
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <h2>Newest Properties</h2>
                </div>
                <div className='slideMain'>
                    <div className='slider'>
                        {this.state.apartments.map((apt, a) => (
                            <div className='homepageAptBox' key={a}>
                                <ApartmentBox {...apt}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}