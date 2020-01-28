import React from 'react';

import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';
import {registerUser} from '../dataFromToServer';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: false,
            fields: {
                email: {value: '', errors: [], validations: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}},
                password: {value: '', errors: [], validations: {required: true, minLength: 5}},
                first_name: {value: '', errors: [], validations: {required: true, minLength: 2}},
                last_name: {value: '', errors: [], validations:{required: false}},
                phone: {value: '', errors:[], validations:{required:false}}
            }

        }
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeState = (newState) => {
        this.setState({
            ...this.state,
            fields: newState
        })
    }

    inputChange({target: {name, value}}) {
        const errors = validate(name, value, this.state.fields[name].validations);
        const newFields = {...this.state.fields};
        newFields[name].value = value;
        newFields[name].errors = errors;
        this.changeState(newFields);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {fields} = this.state;

        let results = {};
        let isValid = true;
        const newFields = {...this.state.fields};

        for (let prop in fields) {
            const value = fields[prop].value;
            const errors = validate(prop, value, fields[prop].validations);
            if (errors.length > 0) {
                isValid = false;
                newFields[prop].errors = errors
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
            await registerUser(results);
            this.setState({
                signup: true
            })

        }else {
            this.changeState(newFields)
        }
    }


    render() {
        const {handleForm} = this.props;
        const {fields} = this.state;
        return (
            <div className={'openForm'}>
                <div className={'formLeft'} style={{backgroundImage: 'url(../images/login_signup.jpg)'}}>
                {this.state.signup ?
                    <h3>Welcome to Realtor.com!</h3>
                        :
                    <div>
                        <h3>{this.state.userSignup ? 'Sign Up' : 'Admin Sign Up'}</h3>
                        <form onSubmit={this.handleSubmit} className='user'>
                            <input type='text' placeholder="First Name" name='first_name' onBlur={this.inputChange}/>
                            <InputErrors errors={fields.first_name.errors}/>
                            
                            <input type='text' placeholder="Last Name" name='last_name' onBlur={this.inputChange}/>
                            <InputErrors errors={fields.last_name.errors}/>
                            
                            <input type={'email'} placeholder={'Email Address'} name="email" onBlur={this.inputChange}/>
                            <InputErrors errors={fields.email.errors}/>
                            
                            <input type={'password'} placeholder={'Password'} name="password" onBlur={this.inputChange}/>
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
                }
                </div>
                <img src={'../images/xIcon.png'} alt={'close'} className={'exitBtn'} onClick={() => handleForm(false)}/>
            </div>
        );
    }
}

export default Signup