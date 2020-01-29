import React from 'react';
import Cookies from 'js-cookie';

import {getApartmentsFromServer, getUsers, getUserHistory} from '../dataFromToServer';
import ShowAptStats from './showAptStats';
import UserDetails from '../user/userDetails';

export default class AdminMain extends React.Component {
    constructor() {
        super();
        this.state = {
            user: false,
            apartments_pending: [],
            apartments_denied: [],
            apartments_approved: [],
            apartments_removed: [],
            showApartments: true,
            showCurrent: [],
            active_users: [],
            inactive_users: [],
            showCurrentUsers: [],
            current: 'pending'
        }
    }

    async componentDidMount() {
        const user = Cookies.get('user');
        if (user) {
            const [apartments, users, history] = await Promise.all(
                [getApartmentsFromServer(), getUsers(), getUserHistory()]    
            );
            const aprtStatus = {apartments_pending: [], 
                                  apartments_denied: [], 
                                  apartments_approved: [], 
                                  apartments_removed: []};
            const userStatus = {
                active_users: [],
                inactive_users: []
            };
            for (let i = 0; i < apartments.apartments.length; i++) {
                const current = `apartments_${apartments.apartments[i].status}`
                aprtStatus[current].push(apartments.apartments[i])
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
                user: true,
                apartments_pending: aprtStatus.apartments_pending,
                apartments_denied: aprtStatus.apartments_denied,
                apartments_approved: aprtStatus.apartments_approved,
                apartments_removed: aprtStatus.apartments_removed,
                showCurrent: aprtStatus.apartments_pending,
                active_users: userStatus.active_users,
                inactive_users: userStatus.inactive_users,
            })
        } else {
            setTimeout(function() {
                window.location.replace('/');
            }, 2000)
        }
    }

    changeCurrentApt = (status) => {
        const clicked = `apartments_${status}`;
        this.setState({
            showApartments: true,
            showCurrent: this.state[clicked],
            current: status
        })
    }

    showUsers = (status) => {
        const clicked = `${status}_users`;
        this.setState({
            showApartments: false,
            showCurrentUsers: this.state[clicked],
            current: status
        })
    }

    render() {
        return (
            <div>
                {!this.state.user ? 
                    <div className='text-center' style={{height: '81vh'}}>
                        <h1>Oops..</h1>
                        <h2>Looks like you're not authorized for this page</h2>
                    </div>
                    :
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-3 col-lg-2 adminMenu'>
                                <h4>Apartments</h4>
                                <h5 onClick={() => this.changeCurrentApt('pending')} className={this.state.current === 'pending' && 'current'}>Pending: {this.state.apartments_pending.length}</h5>
                                <h5 onClick={() => this.changeCurrentApt('denied')} className={this.state.current === 'denied' && 'current'}>Denied: {this.state.apartments_denied.length}</h5>
                                <h5 onClick={() => this.changeCurrentApt('approved')} className={this.state.current === 'approved' && 'current'}>Active: {this.state.apartments_approved.length}</h5>
                                <h5 onClick={() => this.changeCurrentApt('removed')} className={this.state.current === 'removed' && 'current'}>Removed: {this.state.apartments_removed.length}</h5>
                                <h4>Users</h4>
                                <h5 onClick={() => this.showUsers('active')} className={this.state.current === 'active' && 'current'}>Active: {this.state.active_users.length}</h5>
                                <h5 onClick={() => this.showUsers('inactive')} className={this.state.current === 'inactive' && 'current'}>Blocked: {this.state.inactive_users.length}</h5>
                            </div>
                            <div className='col-4 col-md-9 stats'>
                                {this.state.showApartments ?
                                    <ShowAptStats apartments= {this.state.showCurrent} status={this.state.current}/>
                                    :
                                    <div>
                                        <h2>{this.state.current === 'active' ? 'Active' : 'Blocked'} Users</h2>
                                        <div className='row userStat'>
                                            {this.state.showCurrentUsers.map((user, u) => <UserDetails user={user} key={u}/>)}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}