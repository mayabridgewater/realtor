import React from 'react';

import {getApartmentsFromServer, getUsers} from '../dataFromToServer';

class WhatsHappening extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments_approved: [],
            apartments_removed: [],
            active_users: []
        }
    }

    async componentDidMount() {
        const [apartments, users] = await Promise.all(
            [getApartmentsFromServer(), getUsers()]    
        );
        const aprtStatus = { apartments_approved: [], 
                             apartments_removed: []};
        const userStatus = {
            active_users: []
        };
        for (let i = 0; i < apartments.apartments.length; i++) {
            if (apartments.apartments[i].status === 'approved' || apartments.apartments[i].status === 'removed') {
                const current = `apartments_${apartments.apartments[i].status}`
                aprtStatus[current].push(apartments.apartments[i])
            }
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].status === 'active') {
                const current = `${users[i].status}_users`;
                userStatus[current].push(users[i])
            }
        }
        this.setState({
            apartments_approved: aprtStatus.apartments_approved,
            apartments_removed: aprtStatus.apartments_removed,
            active_users: userStatus.active_users,
        })
    }
    
    render() {
        return (
            <div className={'container cityInfo'}>
                <h1>What's New</h1>
                <div className={'row info'}>
                    <div className={'test col-6 col-md-4'}>
                        <p className={'statNum'}>{this.state.apartments_approved.length}</p>
                        <p className={'statText'}>Homes for Sale</p>
                    </div>
                    <div className={'test col-6 col-md-4'}>
                        <p className={'statNum'}>{this.state.apartments_removed.length}</p>
                        <p className={'statText'}>Recently Sold</p>
                    </div>
                    <div className={'test col-6 col-md-4'}>
                        <p className={'statNum'}>{this.state.active_users.length}</p>
                        <p className={'statText'}>Active Users</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhatsHappening