import React from 'react';

import validate from '../forms/validation';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {value: '', errors: [], validations: {required: true, pattern: ''}},
            password: {value: '', errors: [], validations: {required: true, minLength: 8}}
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

        let results = {};
        let isValid = true;
        for (let prop in this.state) {
            const value = this.state[prop].value;
            const errors = validate(prop, value, this.state[prop].validations);
            if (errors.length > 0) {
                isValid = false;
                this.setState({
                    [prop]: {
                        ...this.state,
                        errors
                    }
                })
            } else {
                results[prop] = value
            }
        }
        if (isValid) {
            console.log(results)
        }
    }


    render() {
        const {handleForm, check} = this.props;
        return (
            <div className={'openForm'}>
                <div className={'formLeft'}>
                    <h3>Welcome to realtor.com</h3>
                    <span>Sign up to get property updates, home search tips and local insights via email.</span>
                    <form onSubmit={this.handleSubmit}>
                        <input type={'text'} placeholder={'Email Address'} name="email" onBlur={this.inputChange}/>
                        <input type={'text'} placeholder={'Password'} name="password" onBlur={this.inputChange}/>
                            <div>
                                <input type={'radio'} id={'radio'} name={'send'} checked onClick={check}/>Send me news, tips and promos from Move and realtor.com® using my email address.
                            </div>
    
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