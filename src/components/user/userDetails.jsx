import React from 'react';

import {updateUser} from '../dataFromToServer';

export default class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block: false,
            unblock: false,
            status_description: ''
        };
        this.block = this.block.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.unblock = this.unblock.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    block() {
        this.setState({
            block: !this.state.block
        })
    }

    unblock() {
        this.setState({
            unblock: !this.state.unblock
        })
    }

    inputChange({target: {name, value}}) {
        this.setState({
            [name]: value
        })
    }

    async handleSumbit(e) {
        e.preventDefault();
        let queryStatus = '';
        if (this.state.blocked) {
            queryStatus = 'inactive'
        }else {
            queryStatus = 'active'
        }
        const data = {id: this.props.user.id, status: queryStatus, status_description: this.state.status_description};
        await updateUser(data);
        window.location.replace('/admin')
    }

    render() {
        const {user} = this.props;
        return (
            <div className='col-sm-3 col-md-4' style={{border: '1px solid'}}>
                <h5>User: {user.first_name} {user.last_name}</h5>
                <p>Role: {user.role_id === 3 ? 'Admin' : 'Regular User'}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <div style={{border: '1px solid green'}}>
                    <p>User History: </p>
                    {user.history.map((history, h) => (
                        <div>
                            <p>Status: {history.label}</p>
                            <p>Date: {history.date}</p>
                            <p>Description: {history.description}</p>
                        </div>
                    ))}
                </div>
                {user.status === 'active' ?
                    <button onClick={this.block}>Block</button>
                    :
                    <button onClick={this.unblock}>Unblock</button>
                }
                {this.state.block && 
                    <form onSubmit={this.handleSumbit}>
                        <textarea name='status_description' onChange={this.inputChange}></textarea>
                        <input type='submit'/>
                    </form>
                }
                {this.state.unblock && 
                    <form onSubmit={this.handleSumbit}>
                        <textarea name='status_description' onChange={this.inputChange}></textarea>
                        <input type='submit'/>
                    </form>
                }
            </div>
        )
    }
}