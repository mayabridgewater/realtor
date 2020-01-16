import React from 'react';

import {getCountries, getCitiesByCountry} from './dataFromToServer';
import validate from './forms/validation';
import InputErrors from './forms/inputErrors';

class AddApartment extends React.Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            cities: [],
            fields: {
                address: {value:'', errors: [], validations: {required: true, minLength: 10}},
                city: {value: '', errors: [], validations: {required: true}},
                price: {value: '', errors: [], validations: {required: true}},
                number_of_room: {value: '', errors: [], validations: {required: false}},
                number_of_bath: {value: '', errors: [], validations: {required: false}},
                sqft: {value: '', errors: [], validations: {required: true}},
                description: {value: '', errors: [], validations: {required: false}},
                sale_status: {value: '', errors: [], validations: {required: true}},
                property_type: {value: '', errors: [], validations: {required: true}},
                main_image: {value: '', errors: [], validations: {required: false}}
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
        const cities = await getCitiesByCountry(country_id);
        this.setState({
            ...this.state,
            cities
        })
    }
  
    inputChange = ({target: {name, value}}) => {
        const errors = validate(name, value, this.state.fields[name].validations);
        if (name === 'main_image') {
            let imgData = new FormData();
            const main_image = document.querySelector('input[type="file"]').files[0];
            imgData.append('main_image', main_image);
            this.setState({
                    main_image: {
                        ...this.state.fields.main_image,
                        value: imgData,
                        errors
                    }
            })
        } else {
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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        let isValid = true;

        for (let prop in this.state.fields) {
            const value = this.state.fields[prop].value;
            const errors = validate(prop, value, this.state.fields[prop].validations);
            if (errors.length > 0) {
                isValid = false;
                this.setState({
                    fields: {
                        ...this.state.fields,
                        [prop]: {
                            ...this.state.fields[prop],
                            errors
                        }
                    }
                });
            } else {
                data[prop] = value
            }
        }
        if (isValid) {
            console.log(data)
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Add New Apartment</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea class="form-control" rows="3" name='address' onBlur={this.inputChange}></textarea>
                        <InputErrors errors={this.state.fields.address.errors}/>

                        <label for="inputState">Country</label>
                        <select id="inputState" class="form-control" onClick={this.getCities}>
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

                            <input type="file" name="main_image" onBlur={this.inputChange}/>
                        </div>
                    </div>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
};

export default AddApartment