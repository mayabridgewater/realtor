import React from 'react';

import {getApartmentsFromServer, getUsers, getUserHistory} from '../dataFromToServer';
import Header from '../header/header';
import ShowAptStats from './showAptStats';
import UserDetails from '../user/userDetails';

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
        const [apartments, users, history] = await Promise.all(
            [await getApartmentsFromServer(), await getUsers(), await getUserHistory()]    
        );
        const aprtStatus = {apartments_pending: [], 
                              apartments_denied: [], 
                              apartments_approved: [], 
                              apartments_removed: []};
        const userStatus = {
            active_users: [],
            inactive_users: []
        };
        for (let i = 0; i < apartments.length; i++) {
            const current = `apartments_${apartments[i].status}`
            aprtStatus[current].push(apartments[i])
        }
        for (let i = 0; i < users.length; i++) {
            const current = `${users[i].status}_users`;
            const id = users[i].id;
            users[i].history = [];
            for (let j = 0; j < history.length; j++) {
                if (history[j].user_id === id) {
                    users[i].history.push(history[j]);
                }
            }
            userStatus[current].push(users[i])
        }
        this.setState({
            apartments_pending: aprtStatus.apartments_pending,
            apartments_denied: aprtStatus.apartments_denied,
            apartments_approved: aprtStatus.apartments_approved,
            apartments_removed: aprtStatus.apartments_removed,
            showCurrent: aprtStatus.apartments_pending,
            active_users: userStatus.active_users,
            inactive_users: userStatus.inactive_users,
        })
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
                                <div>
                                    <h2>{this.state.showCurrentUsers[0].status} Users</h2>
                                    <div className='row'>
                                        {this.state.showCurrentUsers.map((user, u) => <UserDetails user={user} key={u}/>)}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}