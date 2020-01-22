import React from 'react';
import Cookies from 'js-cookie';

import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';

class ApartmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {value: `I am interested in ${this.props.address}`, errors: [], validations: {required: true}},
            fullname: {value: '', errors: [], validations: {required: true}},
            email: {value: '', errors: [], validations: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}},
            phone: {value: '', errors: [], validations: {required: false}}
        };
        this.textboxChange = this.textboxChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    textboxChange({target: {name, value}}) {
        this.setState({
            message: {
                ...this.state.message,
                value
            }
        })
    }

    inputChange({target: {name, value}}) {
        const errors = validate(name, value, this.state[name].validations);
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                errors
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const stateCopy = {...this.state};
        let isValid = true;
        const sendMessage = {}

        for (let prop in stateCopy) {
            const errors = validate(prop, stateCopy[prop].value, stateCopy[prop].validations);
            if (errors.length) {
                isValid = false;
                stateCopy[prop].errors = errors
            }
            sendMessage[prop] = stateCopy[prop].value
        }
        if (isValid) {
            console.log(sendMessage)
        }else {
            this.setState({
                ...stateCopy
            })
        }
    }

    render() { 
        // console.log(Cookies.get('user'))
        return (
            <div className={'aptForm d-none d-lg-flex flex-column'}>
                <p>More about this property</p>
                <form className={'d-flex flex-column'} onSubmit={this.handleSubmit}>
                    <input type={'text'} name='fullname' placeholder={'Full Name'} onBlur={this.inputChange}/>
                    <InputErrors errors={this.state.fullname.errors}/>
                    <input type={'text'} name='email' placeholder={'Email'} onBlur={this.inputChange}/>
                    <InputErrors errors={this.state.email.errors}/>
                    <input type={'text'} name='phone' placeholder={'Phone'} onBlur={this.inputChange}/>
                    <InputErrors errors={this.state.phone.errors}/>
                    <textarea name='message' value={this.state.message.value} onChange={this.textboxChange}/>
                    <input type='submit' value='Email Agent'></input>
                </form>
                <span>By proceeding, you consent to receive calls and texts at the number you provided, including marketing by autodialer and prerecorded and artificial voice, and email, from realtor.com and others about your inquiry and other home-related matters, but not as a condition of any purchase. More...</span>
            </div>
        );
    }
}

export default ApartmentForm