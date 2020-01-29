import React from 'react';
import Cookies from 'js-cookie';

import {getCountries, getCitiesByCountry, addApartment} from '../../api/dataFromToServer';
import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';

class AddApartment extends React.Component {
    constructor() {
        super();
        this.state = {
            user: false,
            countries: [],
            cities: [],
            valid: true,
            fields: {
                address: {value:'', errors: [], validations: {required: true, minLength: 8}},
                city: {value: '', errors: [], validations: {required: true}},
                price: {value: '', errors: [], validations: {required: true}},
                number_of_room: {value: '', errors: [], validations: {required: false}},
                number_of_bath: {value: '', errors: [], validations: {required: false}},
                sqft: {value: '', errors: [], validations: {required: true}},
                description: {value: '', errors: [], validations: {required: false, maxLength: 500}},
                sale_status: {value: '', errors: [], validations: {required: true}},
                property_type: {value: '', errors: [], validations: {required: true}},
                main_image: {value: '', errors: [], validations: {required: false}},
                images: {value: '', errors: [], validations: {required: false}}
            }
        }
        this.getCities = this.getCities.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        const user = Cookies.get('user');
        if(user) {
            const countries = await getCountries();
            this.setState({
                ...this.state,
                countries,
                user: true
            })
        }
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

    async handleSubmit(e) {
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
            const success = await addApartment(data);
            if (success.error) {
                this.setState({
                    valid: false
                })
            } else {
                this.setState({
                    valid: true
                })
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
                {!this.state.user ? 
                    <div className='text-center' style={{height: '81vh'}}>
                        <h1>Oops..</h1>
                        <h2>Please log in or sign up to see this page</h2>
                    </div>
                    :
                    <div className='addApartment' style={{backgroundImage: 'url(./images/addBackground.jpg)'}}>
                        <h1>Add New Apartment</h1>
                        <form onSubmit={this.handleSubmit} enctype="multipart/form-data" action='/apartments' className='form'>
                            <div class="form-group">
                                <div className='inputArea'>
                                    <label>Address</label>
                                    <textarea class="form-control" rows="3" name='address' onBlur={this.inputChange}></textarea>
                                    <InputErrors errors={this.state.fields.address.errors}/>
                                </div>

                                <div className='inputArea'>
                                    <label for="inputState">Country</label>
                                    <select id="inputState" class="form-control" onChange={this.getCities}>
                                        {this.state.countries.map((country, c) => (
                                            <option key={c} value={country.id}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className='inputArea'>
                                    <label for="inputCity">City</label>
                                    <select id="inputCity" class="form-control" name='city' onBlur={this.inputChange}>
                                        <option value='' selected></option>
                                        {this.state.cities.map((city, i) => (
                                            <option key={i} value={city.id}>{city.city_name}</option>
                                        ))}
                                    </select>
                                    {!this.state.fields.city.value && <small>Please choose Country for City Selection</small>}
                                    <InputErrors errors={this.state.fields.city.errors}/>
                                </div>
                                    
                                <div>
                                    <div className='row'>
                                        <div className='col-sm-6 innerDetails'> 
                                            <label>Price</label>   
                                            <input type='text' name='price' onBlur={this.inputChange}/>
                                            <InputErrors errors={this.state.fields.price.errors}/>
                                        </div>
                                        
                                        <div className='col-sm-6 innerDetails'>
                                            <label>Rooms</label>   
                                            <input type='text' name='number_of_room' onBlur={this.inputChange}/>
                                        </div>

                                        <div className='col-sm-6 innerDetails'>
                                            <label>Bathrooms</label>   
                                            <input type='text' name='number_of_bath' onBlur={this.inputChange}/>
                                        </div>

                                        <div className='col-sm-6 innerDetails'>
                                            <label>Sqft</label>   
                                            <input type='text' name='sqft' onBlur={this.inputChange}/>
                                            <InputErrors errors={this.state.fields.sqft.errors}/>
                                        </div>
                                    </div>

                                    <div className='inputArea'>
                                        <label>Description</label>
                                        <textarea class="form-control" rows="3" name='description' onBlur={this.inputChange}></textarea>
                                    </div>

                                    <div className='inputArea'>
                                        <label>Sale Status</label>
                                        <select class="form-control" name='sale_status' onBlur={this.inputChange}>
                                            <option value='sale'>For Sale</option>
                                            <option value='rent'>For Rent</option>
                                            <option value='both'>Both</option> 
                                        </select>
                                        <InputErrors errors={this.state.fields.sale_status.errors}/>
                                    </div>

                                    <div className='inputArea'>
                                        <label>Property Type</label>
                                        <select class="form-control" name='property_type' onBlur={this.inputChange}>
                                            <option value='house'>House</option>
                                            <option value='ranch'>Ranch</option>
                                            <option value='condo'>Condo</option>
                                            <option value='land'>Land</option> 
                                        </select>
                                        <InputErrors errors={this.state.fields.property_type.errors}/>
                                    </div>

                                    <div className='inputArea file'>
                                        <label>Main Image</label>
                                        <input type="file" name="main_image"/>
                                    </div>

                                    <div className='inputArea file'>
                                        <label>Extra Pictures</label>
                                        <small>(Maximum 10 photos)</small>
                                        <input type="file" id='multipleImages' name="images" multiple/>
                                    </div>
                                </div>
                            </div>
                            {!this.state.valid &&
                                <p className='form-text text-danger'>Invalid input, please try again</p>
                            }
                            <div className='submitWrap'>
                                <input type='submit' className='submit'></input>
                            </div>
                        </form>
                </div>
                }
            </div>
        )
    }
};

export default AddApartment