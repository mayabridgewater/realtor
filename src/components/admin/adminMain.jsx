import React from 'react';

import {getApartmentsFromServer} from '../dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';

export default class AdminMain extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: []
        }
    }

    async componentDidMount() {
        const query = 'status=pending'
        const pendingApartments = await getApartmentsFromServer(query);
        this.setState({
            apartments: pendingApartments
        })
    }

    render() {
        return (
            <div>
                <h1>Admin Home</h1>
                <div className='container-fluid'>
                    <h3>Pending Apartments</h3>
                    <div className='row'>
                        {this.state.apartments.map((item, i) => <ApartmentBox {...item} key={i}/>)}
                    </div>
                    <div>
                    
                    </div>
                </div>
            </div>
        )
    }
}