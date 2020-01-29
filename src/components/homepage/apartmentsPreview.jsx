import React from 'react';

import {getApartmentsFromServer} from '../dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';

export default class ApartmentsPreview extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: []
        }
    }

    async componentDidMount() {
        const apartments = await getApartmentsFromServer('availability=available&status=approved');
        const fourApt = apartments.apartments.slice(0, 4);
        this.setState({
            apartments: fourApt
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