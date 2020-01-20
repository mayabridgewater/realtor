import React from 'react';

import {getApartmentsFromServer} from '../dataFromToServer';
import Header from '../header/header';
import ShowAptStats from './showAptStats';

export default class AdminMain extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments_pending: [],
            apartments_denied: [],
            apartments_approved: [],
            apartments_removed: [],
            showCurrent: []
        }
    }

    async componentDidMount() {
        let query = 'status=pending';
        const apartments_pending = await getApartmentsFromServer(query);
        query = 'status=denied';
        const apartments_denied = await getApartmentsFromServer(query);
        query = 'status=approved';
        const apartments_approved = await getApartmentsFromServer(query);
        query = 'status=removed';
        const apartments_removed = await getApartmentsFromServer(query);
        this.setState({
            apartments_pending,
            apartments_denied,
            apartments_approved,
            apartments_removed,
            showCurrent: apartments_pending
        })
    }

    changeStat = (status) => {
        const clicked = `apartments_${status}`;
        this.setState({
            showCurrent: this.state[clicked]
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-3 adminMenu'>
                            <h5 style={{color: 'green'}}>Apartments</h5>
                            <h4 onClick={() => this.changeStat('pending')}>Pending: {this.state.apartments_pending.length}</h4>
                            <h4 onClick={() => this.changeStat('denied')}>Denied: {this.state.apartments_denied.length}</h4>
                            <h4 onClick={() => this.changeStat('approved')}>Active: {this.state.apartments_approved.length}</h4>
                            <h4 onClick={() => this.changeStat('removed')}>Removed: {this.state.apartments_removed.length}</h4>
                            <h5 style={{color: 'green'}}>Users</h5>
                            <h4>Active: </h4>
                            <h4>Blocked: </h4>
                        </div>
                        <div className='col-9'>
                        <h1>Admin Home</h1>
                            <ShowAptStats apartments= {this.state.showCurrent}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}