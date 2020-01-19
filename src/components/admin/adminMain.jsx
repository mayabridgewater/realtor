import React from 'react';

import {getApartmentsFromServer} from '../dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';
import Header from '../header/header';

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
                <Header/>
                <div className='container-fluid'>
                    <h1>Admin Home</h1>
                    <div>
                        <h3>Pending Apartments</h3>
                        <div className='row'>
                            {this.state.apartments.map((item, i) => <ApartmentBox {...item} key={i}/>)}
                        </div>
                        <div>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}