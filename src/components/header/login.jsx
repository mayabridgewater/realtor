import React from 'react';
import Cookies from 'js-cookie';

import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';
import {loginUser} from '../dataFromToServer';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {value: '', errors: [], validations: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}},
            password: {value: '', errors: [], validations: {required: true}}
        }
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    inputChange({target: {name, value}}) {
        const errors = validate(name, value, this.state[name].validations);
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                errors
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        let results = {};
        let isValid = true;
        for (let prop in this.state) {
            const value = this.state[prop].value;
            const errors = validate(prop, value, this.state[prop].validations);
            if (errors.length > 0) {
                isValid = false;
                this.setState({
                    [prop]: {
                        ...this.state[prop],
                        errors
                    }
                })
            } else {
                results[prop] = value
            }
        }
        if (isValid) {
            const login = await loginUser(results);
            if (!login) {
                console.log('incorrect password or email')
            } else {
                const currentCookie = JSON.parse(Cookies.get('user'));
                this.props.login(currentCookie.role_id)
            }
        }
    }

    render() {
        const {handleForm} = this.props;
        return (
            <div className={'openForm'}>
                <div className={'formLeft'}>
                    <h3>Log in to your account</h3>
                    <span>Access all your saved properties, searches, notes and more.</span> 
                    <form onSubmit={this.handleSubmit}>
                        <input type={'email'} placeholder={'Email Address'} name='email' onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.email.errors}/>

                        <input type={'text'} placeholder={'Password'} name='password' onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.password.errors}/>
                            <span><a href={'/'}>Forgot Password?</a></span>
                    
                            <div>
                                <input type="submit" className="submit" value="Log In"/>
                                <span className={'toAccount'} onClick={() => handleForm(2)}>No account? Sign Up</span>
                            </div>
                           
                    </form>
                  
                    
                </div>
                <div className={'formRight'}>
                    <h3>Real estate professional?</h3>
                    <div>Manage your profile, leads, listing and more.</div>
                    <button>Pro Log in</button>
                    <span><a href={'/'}>No professional account? Sign up here</a></span>
                </div>
                <img src={'../images/xIcon.png'} alt={'close'} className={'exitBtn'} onClick={() => handleForm(false)}/>
            </div>
        );
    }
}

export default Login