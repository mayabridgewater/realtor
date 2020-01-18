import React from 'react';
import { Link } from 'react-router-dom';

import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';
import {registerUser} from '../dataFromToServer';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userSignup: true,
            fields: {
                email: {value: '', errors: [], validations: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}},
                password: {value: '', errors: [], validations: {required: true, minLength: 8}},
                first_name: {value: '', errors: [], validations: {required: true, minLength: 2}},
                last_name: {value: '', errors: [], validations:{required: false}},
                phone: {value: '', errors:[], validations:{required:false}}
            }

        }
        this.inputChange = this.inputChange.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser() {
        this.setState({
            ...this.state,
            userSignup: !this.state.userSignup
        })
    }

    inputChange({target: {name, value}}) {
        const errors = validate(name, value, this.state.fields[name].validations);
        this.setState({
            fields: {
                ...this.state.fields,
                [name]: {
                    ...this.state.fields[name],
                    value,
                    errors
                }

            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const {fields} = this.state;

        let results = {};
        let isValid = true;
        for (let prop in fields) {
            const value = fields[prop].value;
            const errors = validate(prop, value, fields[prop].validations);
            if (errors.length > 0) {
                isValid = false;
                this.setState({
                    fields: {
                        ...fields,
                        [prop]: {
                            ...fields[prop],
                            errors
                        }

                    }
                })
            } else {
                results[prop] = value
            }
        }
        if (isValid) {
            if (this.state.userSignup) {
                results.role_id = 4
            } else {
                results.role_id = 3
            }
            registerUser(results)
        }
    }


    render() {
        const {handleForm} = this.props;
        const {fields} = this.state;
        return (
            <div className={'openForm'}>
                <div className={'formLeft'}>
                    <h3>{this.state.userSignup ? 'Sign Up' : 'Admin Sign Up'}</h3>
                    <form onSubmit={this.handleSubmit} className='user'>
                        <input type='text' placeholder="First Name" name='first_name' onBlur={this.inputChange}/>
                        <InputErrors errors={fields.first_name.errors}/>
                        
                        <input type='text' placeholder="Last Name" name='last_name' onBlur={this.inputChange}/>
                        <InputErrors errors={fields.last_name.errors}/>
                        
                        <input type={'email'} placeholder={'Email Address'} name="email" onBlur={this.inputChange}/>
                        <InputErrors errors={fields.email.errors}/>
                        
                        <input type={'text'} placeholder={'Password'} name="password" onBlur={this.inputChange}/>
                        <InputErrors errors={fields.password.errors}/>
                        
                        <input type='text' placeholder='Phone Number' name='phone' onBlur={this.inputChange}/>   
                        <InputErrors errors={fields.phone.errors}/>
                        
                        <div className={'signUp'}>
                            <input type="submit" className="submit" value="Sign Up"/>
                            <span className={'toAccount'} onClick={() => handleForm(1)}>Registered? Log In</span>
                        </div>
                    </form>
                  
                    <span>By creating an account you agree to our <a href={'/'} style={{color: 'grey'}}>Terms of Use</a> and <a href={"/"} style={{color: 'grey'}}>Privacy Policy</a>.</span>
                </div>
                <div className={'formRight'}>
                    <h3>Real estate professional?</h3>
                    <button onClick={this.changeUser}>{this.state.userSignup ? 'Pro Sign up' : 'User Sign Up'}</button>
                    <span><a href={'/'}>Already registered? Log in here</a></span>
                </div>
                <img src={'../images/xIcon.png'} alt={'close'} className={'exitBtn'} onClick={() => handleForm(false)}/>
            </div>
        );
    }
}

export default Signup