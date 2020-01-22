import React from 'react';

import {updateUser} from '../dataFromToServer';

export default class UserDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            block: false,
            status_description: ''
        };
        this.block = this.block.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    block() {
        this.setState({
            block: !this.state.block
        })
    }

    inputChange({target: {name, value}}) {
        this.setState({
            [name]: value
        })
    }

    handleSumbit = (e) => {
        e.preventDefault();
        const data = {id: this.props.id, status: 'inactive', status_description: this.state.status_description};
        updateUser(data);
        window.location.replace('/admin')
    }

    render() {
        const {id, role_id, first_name, last_name, email, phone, status} = this.props;
        return (
            <div className='col-sm-3 col-md-4' style={{border: '1px solid'}}>
                <h5>User: {first_name} {last_name}</h5>
                <p>Role: {role_id === 3 ? 'Admin' : 'Regular User'}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                {status === 'active' ?
                    <button onClick={this.block}>Block</button>
                    :
                    <button>Unblock</button>
                }
                {this.state.block && 
                    <form onSubmit={this.handleSumbit}>
                        <textarea name='status_description' onChange={this.inputChange}></textarea>
                        <input type='submit'/>
                    </form>
                }
            </div>
        )
    }
}