import React from 'react';
import PhoneNav from "./phoneNav";
import Login from './login';
import Signup from "./signup";

class RightNav extends React.Component {
    constructor(){
        super();
        this.state = {
            display: false,
            showForm: 2//null
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

    render() {
        return (
            <div className={'rightNav d-flex'}>
                <div className={'img d-none d-md-flex'} onMouseEnter={this.showStyle} onMouseLeave={() => this.showStyle(false)}>
                    <img src={'./images/phoneicon.png'} width={'30px'} alt={''}/>
                    {this.state.display && <PhoneNav/>}
                </div>
                <p onClick={() => this.handleForm(1)} style={{padding: '0 5px'}}>Log In</p>
                {this.state.showForm === 1 && <Login handleForm={this.handleForm}/>}
                <p onClick={() => this.handleForm(2)} style={{padding: '0 5px'}}>Sign Up</p>
                {this.state.showForm === 2 && <Signup handleForm={this.handleForm} check={this.unCheck}/>}
                <span className={'d-none d-md-flex'}>|</span>
                <p className={'d-none d-md-flex'}><a href={"/"}>Advertise</a></p>
            </div>
        );
    }
}

export default RightNav