import React from 'react';

import {updateUser} from '../../api/dataFromToServer';

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
        if (this.state.block) {
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
            <div className='col-sm-6 col-lg-3 singleUser'>
                <h3 className='text-center' style={{fontSize: '25px'}}>{user.first_name} {user.last_name}</h3>
                <p>Role: <span>{user.role_id === 3 ? 'Admin' : 'Regular User'}</span></p>
                <p>Email: <span>{user.email}</span></p>
                <p>Phone: <span>{user.phone}</span></p>
                <div className='userHistory'>
                    <p>User History- </p>
                    {user.history.map((history, h) => (
                        <div className='historyBlock'>
                            <p>Status: <span>{history.label}</span></p>
                            <p>Date: <span>{history.date}</span></p>
                            <p>Description: <span>{history.description}</span></p>
                        </div>
                    ))}
                </div>
                {user.status === 'active' ?
                    <button onClick={this.block} className='aptBtn'>Block</button>
                    :
                    <button onClick={this.unblock} className='aptBtn'>Unblock</button>
                }
                {this.state.block && 
                    <form onSubmit={this.handleSumbit} className='block'>
                        <textarea name='status_description' onChange={this.inputChange}></textarea>
                        <input type='submit' className='aptBtn'/>
                    </form>
                }
                {this.state.unblock && 
                    <form onSubmit={this.handleSumbit} className='block'>
                        <textarea name='status_description' onChange={this.inputChange}></textarea>
                        <input type='submit' className='aptBtn'/>
                    </form>
                }
            </div>
        )
    }
}