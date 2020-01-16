import React from 'react';

import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';
import {registerUser} from '../dataFromToServer';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {value: '', errors: [], validations: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}},
            password: {value: '', errors: [], validations: {required: true, minLength: 8}},
            first_name: {value: '', errors: [], validations: {required: true, minLength: 2}},
            last_name: {value: '', errors: [], validations:{required: false}},
            phone: {value: '', errors:[], validations:{required:false}},

        }
        this.inputChange = this.inputChange.bind(this);
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

    handleSubmit = e => {
        e.preventDefault();
        const role = document.querySelector("form").className;

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
            if (role === 'user') {
                results.role_id = 2
            } else {
                results.role_id = 1
            }
            registerUser(results)
        }
    }


    render() {
        const {handleForm} = this.props;
        return (
            <div className={'openForm'}>
                <div className={'formLeft'}>
                    <h3>Sign Up</h3>
                    <form onSubmit={this.handleSubmit} className='user'>
                        <input type='text' placeholder="First Name" name='first_name' onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.first_name.errors}/>
                        
                        <input type='text' placeholder="Last Name" name='last_name' onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.last_name.errors}/>
                        
                        <input type={'email'} placeholder={'Email Address'} name="email" onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.email.errors}/>
                        
                        <input type={'text'} placeholder={'Password'} name="password" onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.password.errors}/>
                        
                        <input type='text' placeholder='Phone Number' name='phone' onBlur={this.inputChange}/>   
                        <InputErrors errors={this.state.phone.errors}/>
                        
                        <div className={'signUp'}>
                            <input type="submit" className="submit" value="Sign Up"/>
                            <span className={'toAccount'} onClick={() => handleForm(1)}>Registered? Log In</span>
                        </div>
                    </form>
                  
                    <span>By creating an account you agree to our <a href={'/'} style={{color: 'grey'}}>Terms of Use</a> and <a href={"/"} style={{color: 'grey'}}>Privacy Policy</a>.</span>
                </div>
                <div className={'formRight'}>
                    <h3>Real estate professional?</h3>
                    <div>Manage your profile, leads, listing and more.</div>
                    <button>Pro Sign up</button>
                    <span><a href={'/'}>Already registered? Log in here</a></span>
                </div>
                <img src={'../images/xIcon.png'} alt={'close'} className={'exitBtn'} onClick={() => handleForm(false)}/>
            </div>
        );
    }
}

export default Signup