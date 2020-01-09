import React from 'react';
import {Link} from "react-router-dom";
import LoginSignup from "../header/loginSignup";

class ApartmentHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            showForm: false
        }
    }

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
            <div className={'border'}>
                <div className={'container d-flex justify-content-between singleApt'}>
                    <div>
                        <Link to={'/'}><img alt={'Realtor.com'} src={'../images/logo.png'} style={{width: '180px'}}/></Link>
                        <input type={'text'}/>
                        <i className={"fas fa-search"}/>
                    </div>
                    <div className={'d-flex align-items-center'}>
                        <p onClick={() => this.handleForm(1)} style={{padding: '0 5px'}}>Log In</p>
                        {this.state.showForm === 1 && <LoginSignup id={1} handleForm={this.handleForm}/>}
                        <p onClick={() => this.handleForm(2)} style={{padding: '0 5px'}}>Sign Up</p>
                        {this.state.showForm === 2 && <LoginSignup id={2} handleForm={this.handleForm} check={this.unCheck}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ApartmentHeader