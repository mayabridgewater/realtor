import React from 'react';

import UserDetails from '../user/userDetails';

export default class ShowUserStats extends React.Component {
    render() {
        const {users} = this.props;
        console.log(users)
        return (
            <div>
                <h2>{users[0].status} Users</h2>
                <div className='row'>
                    {users.map((user, u) => <UserDetails {...user} key={u}/>)}
                </div>
            </div>
        )
    }
}