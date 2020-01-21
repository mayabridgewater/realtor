import React from 'react';

import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';
import {updateApartment} from '../dataFromToServer';

export default class UpdateApt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: {value: this.props.apartment.price, errors: [], validations: {required: true}},
            number_of_room: {value: this.props.apartment.number_of_room, errors: [], validations: {required: false}},
            number_of_bath: {value: this.props.apartment.number_of_bath, errors: [], validations: {required: false}},
            sqft: {value: this.props.apartment.sqft, errors: [], validations: {required: true}},
            description: {value: this.props.apartment.description, errors: [], validations: {required: false}},
            sale_status: {value: this.props.apartment.sale_status, errors: [], validations: {required: true}},
            property_type: {value: this.props.apartment.property_type, errors: [], validations: {required: true}}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange({target: {name, value}}) {
        this.setState({
            [name]: {
                ...this.state[name],
                value
            }                
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        const stateCopy = {...this.state};
        const data = {...this.props.apartment}

        for (let prop in this.state) {
            const errors = validate(prop, this.state[prop].value, this.state[prop].validations);
            if (errors.length) {
                isValid = false;
                stateCopy[prop].errors = errors
            }
            data[prop] = this.state[prop].value
        }
        if (isValid) {
            data.status = 'pending';
            updateApartment(data)
        } else {
            this.setState({
                ...stateCopy
            })
        }
    }

    render() {
        return (
            <div style={{border: '2px solid purple', padding: '5px'}}>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                
                    <label>Price</label>   
                    <input type='text' name='price' value={this.state.price.value} onChange={this.handleChange} onBlur={this.inputChange}/>
                    <InputErrors errors={this.state.price.errors}/>
                    
                    <label>Rooms</label>   
                    <input type='text' name='number_of_room' value={this.state.number_of_room.value} onChange={this.handleChange} onBlur={this.inputChange}/>

                    <label>Bathrooms</label>   
                    <input type='text' name='number_of_bath' value={this.state.number_of_bath.value} onChange={this.handleChange} onBlur={this.inputChange}/>

                    <label>Sqft</label>   
                    <input type='text' name='sqft' value={this.state.sqft.value} onChange={this.handleChange} onBlur={this.inputChange}/>
                    <InputErrors errors={this.state.sqft.errors}/>

                    <label>Description</label>
                    <textarea className="form-control" rows="3" name='description' value={this.state.description.value} onChange={this.handleChange} onBlur={this.inputChange}></textarea>

                    <label>Sale Status</label>
                    <select className="form-control" name='sale_status' value={this.state.sale_status.value} onChange={this.handleChange} onBlur={this.inputChange}>
                        <option value='sale'>For Sale</option>
                        <option value='rent'>For Rent</option>
                        <option value='both'>Both</option> 
                    </select>
                    <InputErrors errors={this.state.sale_status.errors}/>

                    <label>Property Type</label>
                    <select className="form-control" name='property_type' value={this.state.property_type.value} onChange={this.handleChange} onBlur={this.inputChange}>
                        <option value='house'>House</option>
                        <option value='ranch'>Ranch</option>
                        <option value='condo'>Condo</option>
                        <option value='land'>Land</option> 
                    </select>
                    <InputErrors errors={this.state.property_type.errors}/>
                </div>
                <input type='submit'></input>
                </form>
            </div>
        )
    }
}