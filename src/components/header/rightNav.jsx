import React from 'react';
import Cookies from 'js-cookie';

import Login from './login';
import Signup from "./signup";
import { Link } from 'react-router-dom';

class RightNav extends React.Component {
    constructor(){
        super();
        this.state = {
            display: false,
            showForm: null,
            roleId: null //3-admin 4-user
        }
    }

    componentDidMount() {
        const currentCookie = Cookies.get('user');
        if (currentCookie) {
            this.setState({
                roleId: JSON.parse(currentCookie).role_id
            })
        }
    }

    showStyle = () => {
        this.setState({
            display: !this.state.display
        })
    };

    handleForm = (index) => {
        this.setState({
            showForm: index
        })
    };

    unCheck = () => {
      var radioBtn = document.getElementById('radio');
      if (radioBtn.checked) {
          radioBtn.checked = false
      }
    };

    login = (user) => {
        this.setState({
            roleId: user.role_id
        });
        this.props.login()
    };

    logout = () => {
        Cookies.remove('user');
        window.location.replace('/')
        this.setState({
            roleId: undefined
        })
        this.props.logout()
    };

    render() {
        return (
            <div className={'rightNav d-flex'}>
                {!this.state.roleId &&
                <div className='d-flex'>
                    <p onClick={() => this.handleForm(1)} style={{padding: '0 5px'}}>Log In</p>
                    {this.state.showForm === 1 && <Login handleForm={this.handleForm} login={this.login}/>}
                    <p onClick={() => this.handleForm(2)} style={{padding: '0 5px'}}>Sign Up</p>
                    {this.state.showForm === 2 && <Signup handleForm={this.handleForm} check={this.unCheck}/>}
                </div>
                }
                {this.state.roleId && 
                    <div className='d-flex'>
                        <span style={{padding: '0 5px'}}>Welcome {JSON.parse(Cookies.get('user')).first_name}</span>
                        <p onClick={this.logout}>Logout</p>
                    </div>
                    }
                {this.state.roleId === 3 && <Link to='/admin'><p>Admin</p></Link>}
                {this.state.roleId === 4 && <Link to='/userprofile'>My Profile</Link>}
            </div>
        );
    }
}

export default RightNav