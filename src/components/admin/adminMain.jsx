import React from 'react';

import {getApartmentsFromServer, getUsers} from '../dataFromToServer';
import Header from '../header/header';
import ShowAptStats from './showAptStats';
import ShowUserStats from './showUserStats';

export default class AdminMain extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments_pending: [],
            apartments_denied: [],
            apartments_approved: [],
            apartments_removed: [],
            showApartments: true,
            showCurrent: [],
            active_users: [],
            inactive_users: [],
            showCurrentUsers: []
        }
    }

    async componentDidMount() {
        const apartments = await getApartmentsFromServer();
        console.log(apartments)
        // let query = 'status=pending';
        // const apartments_pending = await getApartmentsFromServer(query);
        // query = 'status=denied';
        // const apartments_denied = await getApartmentsFromServer(query);
        // query = 'status=approved';
        // const apartments_approved = await getApartmentsFromServer(query);
        // query = 'status=removed';
        // const apartments_removed = await getApartmentsFromServer(query);
        // query = 'status=active';
        // const active_users = await getUsers(query);
        // query = 'status=inactive';
        // const inactive_users = await getUsers(query);
        // this.setState({
        //     apartments_pending,
        //     apartments_denied,
        //     apartments_approved,
        //     apartments_removed,
        //     showCurrent: apartments_pending,
        //     active_users,
        //     inactive_users,
        // })
    }

    changeCurrentApt = (status) => {
        const clicked = `apartments_${status}`;
        this.setState({
            showApartments: true,
            showCurrent: this.state[clicked]
        })
    }

    showUsers = (status) => {
        const clicked = `${status}_users`;
        console.log('users',this.state[clicked]);
        this.setState({
            showApartments: false,
            showCurrentUsers: this.state[clicked]
        })
    }

    render() {
        console.log(this.state.showCurrentUsers)
        return (
            <div>
                <Header/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-3 adminMenu'>
                            <h5 style={{color: 'green'}}>Apartments</h5>
                            <h4 onClick={() => this.changeCurrentApt('pending')}>Pending: {this.state.apartments_pending.length}</h4>
                            <h4 onClick={() => this.changeCurrentApt('denied')}>Denied: {this.state.apartments_denied.length}</h4>
                            <h4 onClick={() => this.changeCurrentApt('approved')}>Active: {this.state.apartments_approved.length}</h4>
                            <h4 onClick={() => this.changeCurrentApt('removed')}>Removed: {this.state.apartments_removed.length}</h4>
                            <h5 style={{color: 'green'}}>Users</h5>
                            <h4 onClick={() => this.showUsers('active')}>Active: {this.state.active_users.length}</h4>
                            <h4 onClick={() => this.showUsers('inactive')}>Blocked: {this.state.inactive_users.length}</h4>
                        </div>
                        <div className='col-9'>
                        <h1>Admin Home</h1>
                            {this.state.showApartments ?
                                <ShowAptStats apartments= {this.state.showCurrent}/>
                                :
                                <ShowUserStats users={this.state.showCurrentUsers}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}