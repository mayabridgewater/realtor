import React from 'react';
import Cookies from 'js-cookie';

import { getApartmentsFromServer, getImages } from '../../api/dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';
import ApprovedApt from './approvedApt';
import DeniedApt from './deniedApt';
import { Link } from 'react-router-dom';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null,
            approved_apartments: [],
            removed_apartments: [],
            denied_apartments: [],
            pending_apartments: [],
            showing: 'approved'
        }
    }

    async componentDidMount() {
        let user = Cookies.get('user');
        if (user) {
            user = JSON.parse(Cookies.get('user'));
            const id = user.id;
            const query = {user_id: id};
            const [apartments, images] = await Promise.all(
                [getApartmentsFromServer(query), getImages()]
            );
            const status = {
                approved: [],
                removed: [],
                denied: [],
                pending: []
            };
            for (let i = 0; i < apartments.apartments.length; i++) {
                const current = apartments.apartments[i].status;
                const id = apartments.apartments[i].id;
                apartments.apartments[i].images = [];
                for (let j = 0; j < images.length; j++) {
                    if (images[j].apartment_id === id) {
                        apartments.apartments[i].images.push(images[j])
                    }
                }
                status[current].push(apartments.apartments[i])
            };
            this.setState({
                loading: false,
                user: user,
                approved_apartments: status.approved,
                removed_apartments: status.removed,
                denied_apartments: status.denied,
                pending_apartments: status.pending,
            })
        }
    }

    changeStatus = (e) => {
        this.setState({
            showing: e.target.id
        })
    }

    render() {
        return (
            <div>
                {this.state.loading ? 
                    <div className='text-center' style={{height: '81vh'}}>
                        <h1>Oops..</h1>
                        <h2>Please log in or sign up to see this page</h2>
                    </div>
                    :
                    <div className='row' style={{boxSizing: 'border-box'}}>
                        <div className='col-3 userMenu' style={{height: '100vh', borderRight: '1px solid'}}>
                            <h4>Your Apartments</h4>
                            <h5 id='approved' onClick={this.changeStatus} className={this.state.showing === 'approved' && 'current'}>Active: {this.state.approved_apartments.length}</h5>
                            <h5 id='removed' onClick={this.changeStatus} className={this.state.showing === 'removed' && 'current'}>Sold/Deleted: {this.state.removed_apartments.length}</h5>
                            <h5 id='denied' onClick={this.changeStatus} className={this.state.showing === 'denied' && 'current'}>Denied: {this.state.denied_apartments.length}</h5>
                            <h5 id='pending' onClick={this.changeStatus} className={this.state.showing === 'pending' && 'current'}>Pending: {this.state.pending_apartments.length}</h5>

                            <div className='addApt'>
                                <Link to='/addapartment'><h4>Add Apartment</h4></Link>
                            </div>
                        </div>
                        <div className='col-9 showResults'>
                            <div className='row' style={{margin: '0'}}>
                                {this.state.showing === 'approved' && this.state.approved_apartments.map((apt, a) => <ApprovedApt apartment={apt} key={a}/>)}
                                {this.state.showing === 'removed' && this.state.removed_apartments.map((apt, a) => (
                                    <div className={'col-md-6 col-lg-4'}>
                                        <ApartmentBox {...apt} key={a}/>
                                    </div>))}
                                {this.state.showing === 'denied' && this.state.denied_apartments.map((apt, a) => <DeniedApt apartment={apt} key={a}/>)}
                                {this.state.showing === 'pending' && this.state.pending_apartments.map((apt, a) => (
                                    <div className={'col-md-6 col-lg-4'}>
                                        <ApartmentBox {...apt} key={a}/>
                                    </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
} 