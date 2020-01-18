import React from 'react';
import Cookies from 'js-cookie';

import PhoneNav from "./phoneNav";
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

    login = (id) => {
        this.setState({
            roleId: id
        })
    };

    logout = () => {
        Cookies.remove('user');
        this.setState({
            roleId: undefined
        })
    };

    render() {
        return (
            <div className={'rightNav d-flex'}>
                <div className={'img d-none d-md-flex'} onMouseEnter={this.showStyle} onMouseLeave={() => this.showStyle(false)}>
                    <img src={'./images/phoneicon.png'} width={'30px'} alt={''}/>
                    {this.state.display && <PhoneNav/>}
                </div>
                {!this.state.roleId &&
                <div className='d-flex'>
                    <p onClick={() => this.handleForm(1)} style={{padding: '0 5px'}}>Log In</p>
                    {this.state.showForm === 1 && <Login handleForm={this.handleForm} login={this.login}/>}
                    <p onClick={() => this.handleForm(2)} style={{padding: '0 5px'}}>Sign Up</p>
                    {this.state.showForm === 2 && <Signup handleForm={this.handleForm} check={this.unCheck}/>}
                </div>
                }
                {this.state.roleId && <p onClick={this.logout}>Logout</p>}
                {this.state.roleId === 3 && <Link to='/admin'><p>Admin</p></Link>}
                <span className={'d-none d-md-flex'}>|</span>
                <p className={'d-none d-md-flex'}><a href={"/"}>Advertise</a></p>
            </div>
        );
    }
}

export default RightNav