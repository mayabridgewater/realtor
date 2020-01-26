import React from 'react';

import {updateUser, getUserHistory} from '../dataFromToServer';

export default class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block: false,
            unblock: false,
            status_description: '',
            block_description: ''
        };
        this.block = this.block.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.unblock = this.unblock.bind(this)
    }

    async componentDidMount() {
        console.log(this.props.id)
        const desc = await getUserHistory(`id=${this.props.id}&label=inactive`);
        this.setState({
            block_description: desc[0]
        })
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

    handleSumbit = (e) => {
        e.preventDefault();
        let queryStatus = '';
        if (this.state.blocked) {
            queryStatus = 'inactive'
        }else {
            queryStatus = 'active'
        }
        const data = {id: this.props.id, status: queryStatus, status_description: this.state.status_description};
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
                {this.state.block_description ?
                    <div style={{border: '1px solid green'}}>
                        <p>Description: </p>
                        <p>{this.state.block_description.description}</p>
                    </div>
                    :
                    <div></div>
                }
                {status === 'active' ?
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