import React from 'react';
import {Link} from "react-router-dom";

import {getCountries, getCitiesByCountry, getApartmentsFromServer} from '../dataFromToServer';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            display: null,
            displayPrice: true,
            countries: [],
            cities: [],
            reset: false,
            search: {
                city: '',
                min_price: '',
                max_price: '',
                number_of_room: '',
                number_of_bath: '',
                sqft: '',
                created_on: '',
                sale_status: '',
                property_type: '',
                page: '',
                size: ''
            }
        }
        this.getCities = this.getCities.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        const countries = await getCountries();
        this.setState({
            countries
        }) 
    };

    async getCities(e) {
        const country_id = e.target.value;
        const selection = await getCitiesByCountry(country_id);
        this.setState({
            ...this.state,
            cities: selection ? selection : []
        })
    }

    showStyle = (index) => {
        this.setState({
            display: this.state.display === index ? -1 : index
        })
    };

    changePrice = (state) => {
        this.setState({
            displayPrice: !state ? true : null
        })
    };

    inputChange = ({target: {name, value}}) => {
        if (name === 'property_type') {

        }
        this.setState({
            search: {
                ...this.state.search,
                [name]: value
            }
        })
    };

    async handleSubmit(e) {
        e.preventDefault();
        let query = '';
        for (let prop in this.state.search) {
            if (this.state.search[prop]) {
                query += `${prop}=${this.state.search[prop]}&`
            }
        }
        query += 'availability=available&status=approved';
        this.props.filterApartments(query);
        this.setState({
            reset: true,
            display: -1
        })
    };


    resetSearch = () => {
        this.setState({
            reset: false
        });
        this.props.reset()
    };

    render() {
        return (
            <div className={'container-fluid filters'}>
                <div className={'d-flex pt-3 justify-content-between align-center'}>
                    <form onSubmit={this.handleSubmit} className={'d-flex'} autoComplete={"off"}>
                        <select id="inputState" class="form-control" onChange={this.getCities}>
                            <option>Country</option>
                            {this.state.countries.map((country, c) => (
                                <option key={c} value={country.id}>{country.name}</option>
                            ))}
                        </select>
                        <select id="inputCity" class="form-control" name='city' onBlur={this.inputChange}>
                            {this.state.cities.map((city, i) => (
                                <option key={i} value={city.id}>{city.city_name}</option>
                            ))}
                        </select>
                         { <div className={'searchBtn pr-3'}><button type='button' className={'btn'} onClick={() => this.showStyle(1)}>Price</button> 
                            {this.state.display === 1 &&
                            <div className={'priceFilter radio'}>
                                <h3>Price</h3>
                                <div className={'d-flex container-fluid pt-3'}>
                                    <div style={{paddingRight: '8px'}}>
                                        <input type='text' name='min_price' onBlur={this.inputChange} placeholder={'Min Price'} value={this.state.minprice} style={{margin:0}} onFocus={() => this.changePrice(false)}/>
                                        {this.state.displayPrice && <div>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={0} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$0</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={200000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$200K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={400000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$400K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={600000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$600K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={800000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$800K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={1000000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$1M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={1200000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$1.2M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'min_price'} value={1400000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$1.4M</p>
                                            </label>
                                        </div>}
                                    </div>
                                    <span>-</span>
                                    <div style={{paddingLeft: '8px'}}>
                                        <input type='text' name='max_price' onBlur={this.inputChange} placeholder={'Max Price'} value={this.state.maxprice} style={{margin:0}} onFocus={() => this.changePrice(true)}/>
                                        {!this.state.displayPrice && <div>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={350000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$350K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={700000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$700K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={1000000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$1M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={1400000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$1.4M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={1800000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$1.8M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={2200000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$2.2M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={2400000} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>$2.4M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'max_price'} value={undefined} onBlur={this.inputChange} className={'radiobtn'}/>
                                                <p>Any Price</p>
                                            </label>
                                        </div>}
                                    </div>
                                </div>
                            </div>}
                        </div> }
                        <div className={'searchBtn pr-3 d-none d-md-block'}><button type='button' className={'btn'} onClick={() => this.showStyle(2)}>Property Type</button>
                            {this.state.display === 2 &&
                                <div className={'property'}>
                                    <h3>Property Type</h3>
                                    <div className={'row container-fluid propertyTypes'}>
                                        <label className={'col-6'}>
                                            <input type='radio' name='property_type' className={'prop-type-cb radiobtn'} value='house' onBlur={this.inputChange}/>
                                            <img src={'./images/filters/single.png'} alt={''}/><span>House</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='radio' name='property_type' className={'prop-type-cb radiobtn'} value='condo' onBlur={this.inputChange}/>
                                            <img src={'./images/filters/condo.png'} alt={''}/><span>Condo</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='radio' name='property_type' className={'prop-type-cb radiobtn'} value='ranch' onBlur={this.inputChange}/>
                                            <img src={'./images/filters/farm.png'} alt={''}/><span>Ranch</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='radio' name='property_type' className={'prop-type-cb radiobtn'} value='land' onBlur={this.inputChange}/>
                                            <img src={'./images/filters/land.png'} alt={''}/><span>Land</span>
                                        </label>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={'searchBtn pr-3 d-none d-sm-block'}><button type='button' className={'btn'} onClick={() => this.showStyle(3)}>Beds</button>
                        {this.state.display === 3 &&
                            <div className={'beds radio'}>
                                <h3>Bedrooms</h3>
                                <div className={'d-flex pt-3'}>
                                    <label>
                                        <input type="radio" name="number_of_room" value="0" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>Any</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_room" value="1" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>1+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_room" value="2" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>2+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_room" value="3" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>3+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_room" value="4" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>4+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_room" value="5" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>5+</p>
                                    </label>
                                </div>
                            </div>}
                        </div>
                        <div className={'searchBtn pr-3 d-none d-sm-block'}><button type='button' className={'btn'} onClick={() => this.showStyle(4)}>Baths</button>
                            {this.state.display === 4 &&
                            <div className={'beds radio'}>
                                <h3>Bathrooms</h3>
                                <div className={'d-flex pt-3'}>
                                    <label>
                                        <input type="radio" name="number_of_bath" value="0" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>Any</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_bath" value="1" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>1+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_bath" value="2" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>2+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_bath" value="3" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>3+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_bath" value="4" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>4+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="number_of_bath" value="5" onBlur={this.inputChange} className={'radiobtn'}/>
                                        <p>5+</p>
                                    </label>
                                </div>
                            </div>}
                        </div> 
                        <div className={'searchBtn pr-3 d-none d-md-block'}><button type='button' className={'btn'} onClick={() => this.showStyle(5)}>More Options</button>
                            {this.state.display === 5 &&
                                <div className={'property'}>
                                    <h3>Sale Type</h3>
                                    <div className={'row container-fluid propertyTypes'}>
                                        <label className={'col-6'}>
                                            <input type='radio' name='sale_status' className={'prop-type-cb radiobtn'} value='sale' onBlur={this.inputChange}/>
                                            <img src={'./images/filters/for-sale.png'} alt={''}/><span>For Sale</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='radio' name='sale_status' className={'prop-type-cb radiobtn'} value='rent' onBlur={this.inputChange}/>
                                            <img src={'./images/filters/for-rent.png'} alt={''}/><span>For Rent</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='radio' name='sale_status' className={'prop-type-cb radiobtn'} value='both' onBlur={this.inputChange}/>
                                            <img src={'./images/filters/both.png'} alt={''}/><span>Both</span>
                                        </label>
                                    </div>
                                    <h3>Sqft</h3>
                                    <select class="form-control" name='sqft' onBlur={this.inputChange}>
                                        <option value='50'>50+</option>
                                        <option value='100'>100+</option>
                                        <option value='150'>150+</option>
                                        <option value='200'>200+</option>
                                        <option value='300'>300+</option>
                                        <option value='400'>400+</option>
                                        <option value='550'>550+</option>
                                        <option value='1000'>1000+</option>                                        
                                    </select>
                                </div>
                            }
                        </div>
                        <button className={'btn search'}>Search</button>
                        {this.state.reset && <button className={'btn search'} onClick={this.resetSearch}>Reset</button>}
                    </form>
                </div>
            </div>
        )
    }
}

export default Search