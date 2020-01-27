import React from 'react';

import {getCountries, getCitiesByCountry, addApartment} from './dataFromToServer';
import validate from './forms/validation';
import InputErrors from './forms/inputErrors';
import Homepage from './homepage/homePage';
import Header from './header/header';

class AddApartment extends React.Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            cities: [],
            fields: {
                address: {value:'', errors: [], validations: {required: true, minLength: 8}},
                city: {value: '', errors: [], validations: {required: true}},
                price: {value: '', errors: [], validations: {required: true}},
                number_of_room: {value: '', errors: [], validations: {required: false}},
                number_of_bath: {value: '', errors: [], validations: {required: false}},
                sqft: {value: '', errors: [], validations: {required: true}},
                description: {value: '', errors: [], validations: {required: false}},
                sale_status: {value: '', errors: [], validations: {required: true}},
                property_type: {value: '', errors: [], validations: {required: true}},
                main_image: {value: '', errors: [], validations: {required: false}},
                images: {value: '', errors: [], validations: {required: false}}
            }
        }
        this.getCities = this.getCities.bind(this)
    }

    async componentDidMount() {
        const countries = await getCountries();
        this.setState({
            ...this.state,
            countries
        })
    }

    async getCities(e) {
        const country_id = e.target.value;
        const selection = await getCitiesByCountry(country_id);
        this.setState({
            ...this.state,
            cities: selection ? selection : []
        })
    }
  
    inputChange = ({target: {name, value}}) => {
        const errors = validate(name, value, this.state.fields[name].validations);
        const newFields = {...this.state.fields};
        newFields[name].value = value;
        newFields[name].errors = errors;
        this.changeState(newFields)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let data = new FormData();

        const newFields = {...this.state.fields};
        
        for (let prop in this.state.fields) {
            const value = this.state.fields[prop].value;
            const errors = validate(prop, value, this.state.fields[prop].validations);
            if (prop === 'main_image') {
                const main_image = document.querySelector('input[type="file"]').files[0];
                data.append('main_image', main_image);
            } else if (prop === 'images') {
                const images = (document.querySelector('#multipleImages').files);
                Array.from(images).forEach(file => {
                    data.append('images', file)
                })
            } else if (errors.length > 0) {
                isValid = false;
                newFields[prop].errors = errors;
                
            } else {
                data.append(`${prop}`, value)
            }
        }
        if (isValid) {
            const success = addApartment(data);
            if (!success) {
                console.log('no')
            } else {
                window.location.replace('/')
            }
        } else {
            this.changeState(newFields)
        }
    }

    changeState = (newFields) => {
        this.setState({
            ...this.state,
            fields: newFields
        })
    }

    render() {
        return (
            <div>
                {this.state.uploadSuccess ? 
                    <Homepage/> 
                    :
                    <div>
                    <Header/>
                <h1>Add New Apartment</h1>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data" action='/apartments'>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea class="form-control" rows="3" name='address' onBlur={this.inputChange}></textarea>
                        <InputErrors errors={this.state.fields.address.errors}/>

                        <label for="inputState">Country</label>
                        <select id="inputState" class="form-control" onChange={this.getCities}>
                            {this.state.countries.map((country, c) => (
                                <option key={c} value={country.id}>{country.name}</option>
                            ))}
                        </select>
                        
                        <label for="inputCity">City</label>
                        <select id="inputCity" class="form-control" name='city' onBlur={this.inputChange}>
                            <option value='' selected></option>
                            {this.state.cities.map((city, i) => (
                                <option key={i} value={city.id}>{city.city_name}</option>
                            ))}
                        </select>
                        {!this.state.fields.city.value && <small>Please choose Country for City Selection</small>}
                        <InputErrors errors={this.state.fields.city.errors}/>
                            
                        <div>
                            <label>Price</label>   
                            <input type='text' name='price' onBlur={this.inputChange}/>
                            <InputErrors errors={this.state.fields.price.errors}/>

                            <label>Rooms</label>   
                            <input type='text' name='number_of_room' onBlur={this.inputChange}/>

                            <label>Bathrooms</label>   
                            <input type='text' name='number_of_bath' onBlur={this.inputChange}/>

                            <label>Sqft</label>   
                            <input type='text' name='sqft' onBlur={this.inputChange}/>
                            <InputErrors errors={this.state.fields.sqft.errors}/>

                            <label>Description</label>
                            <textarea class="form-control" rows="3" name='description' onBlur={this.inputChange}></textarea>

                            <label>Sale Status</label>
                            <select class="form-control" name='sale_status' onBlur={this.inputChange}>
                                <option value='sale'>For Sale</option>
                                <option value='rent'>For Rent</option>
                                <option value='both'>Both</option> 
                            </select>
                            <InputErrors errors={this.state.fields.sale_status.errors}/>

                            <label>Property Type</label>
                            <select class="form-control" name='property_type' onBlur={this.inputChange}>
                                <option value='house'>House</option>
                                <option value='ranch'>Ranch</option>
                                <option value='condo'>Condo</option>
                                <option value='land'>Land</option> 
                            </select>
                            <InputErrors errors={this.state.fields.property_type.errors}/>
                            
                            <label>Main Image</label>
                            <input type="file" name="main_image"/>

                            <label>Extra Pictures</label>
                            <input type="file" id='multipleImages' name="images" multiple/>
                        </div>
                    </div>
                    <input type='submit'></input>
                </form>
                </div>
    }
            </div>
        )
    }
};

export default AddApartment