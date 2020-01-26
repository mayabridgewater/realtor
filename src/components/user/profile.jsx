import React from 'react';
import Cookies from 'js-cookie';

import Header from '../header/header';
import { getApartmentsFromServer } from '../dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';
import ApprovedApt from './approvedApt';
import DeniedApt from './deniedApt';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            approved_apartments: [],
            removed_apartments: [],
            denied_apartments: [],
            pending_apartments: [],
            showing: 'approved'
        }
    }

    async componentDidMount() {
        const user = JSON.parse(Cookies.get('user'))
        const id = user.id;
        const [apartments] = await Promise.all(
            [getApartmentsFromServer(`id=${id}`)]
        );
        const status = {
            approved: [],
            removed: [],
            denied: [],
            pending: []
        };
        for (let i = 0; i < apartments.length; i++) {
            const current = apartments[i].status;
            status[current].push(apartments[i])
        };
        console.log(status)
        this.setState({
            user: user,
            approved_apartments: status.approved,
            removed_apartments: status.removed,
            denied_apartments: status.denied,
            pending_apartments: status.pending,
        })
    }

    changeStatus = (e) => {
        this.setState({
            showing: e.target.id
        })
    }

    render() {
        const {currentUser} = this.props;
        console.log(this.state);
        return (
            <div>
                <Header/>
                <div className='row'>
                    <div className='col-3' style={{height: '100vh', borderRight: '1px solid'}}>
                        <h4>Your Apartments</h4>
                        <h5 id='approved' onClick={this.changeStatus}>Active: {this.state.approved_apartments.length}</h5>
                        <h5 id='removed' onClick={this.changeStatus}>Sold/Deleted: {this.state.removed_apartments.length}</h5>
                        <h5 id='denied' onClick={this.changeStatus}>Denied: {this.state.denied_apartments.length}</h5>
                        <h5 id='pending' onClick={this.changeStatus}>Pending: {this.state.pending_apartments.length}</h5>
                    </div>
                    <div className='col-9' style={{padding: '20px'}}>
                        <div className='row'>
                            {this.state.showing === 'approved' && this.state.approved_apartments.map((apt, a) => <ApprovedApt apartment={apt} key={a}/>)}
                            {this.state.showing === 'removed' && this.state.removed_apartments.map((apt, a) => <ApartmentBox {...apt} key={a}/>)}
                            {this.state.showing === 'denied' && this.state.denied_apartments.map((apt, a) => <DeniedApt apartment={apt} key={a}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 