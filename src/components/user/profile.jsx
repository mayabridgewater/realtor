import React from 'react';
import Cookies from 'js-cookie';

import Header from '../header/header';
import { getApartmentsFromServer } from '../dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';
import ApprovedApt from './approvedApt';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            approved_apartments: [],
            removed_apartments: [],
            denied_apartments: [],
            pending_apartments: []
        }
    }

    async componentDidMount() {
        const user = JSON.parse(Cookies.get('user'))
        const id = user.id;
        const approved = await getApartmentsFromServer(`status=approved&user_id=${id}`);
        const removed = await getApartmentsFromServer(`status=removed&user_id=${id}`);
        const denied = await getApartmentsFromServer(`status=denied&user_id=${id}`);
        const pending = await getApartmentsFromServer(`status=pending&user_id=${id}`);
        this.setState({
            approved_apartments: approved,
            removed_apartments: removed,
            denied_apartments: denied,
            pending_apartments: pending
        })
    }
    render() {
        const {currentUser} = this.props;
        return (
            <div>
                <Header/>
                <div className='row'>
                    <div className='col-3' style={{height: '100vh', borderRight: '1px solid'}}>
                        <h4>Your Apartments</h4>
                        <h5>Active: {this.state.approved_apartments.length}</h5>
                        <h5>Sold: {this.state.removed_apartments.length}</h5>
                        <h5>Denied: {this.state.denied_apartments.length}</h5>
                        <h5>Pending: {this.state.pending_apartments.length}</h5>
                    </div>
                    <div className='col-9'>
                        <div>
                            {this.state.approved_apartments.map((apt, a) => <ApprovedApt apartment={apt} key={a}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 