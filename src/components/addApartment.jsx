import React from 'react';

import {getCountries} from './dataFromToServer';

class AddApartment extends React.Component {
    constructor() {
        super();
        this.state = {
            countries: []
        }
    }

    async componentDidMount() {
        const countries = await getCountries();
        this.setState({
            countries
        })
    }

    render() {
        return (
            <div>
                <h1>Add New Apartment</h1>
                <form>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea class="form-control" rows="3" name='address'></textarea>

                        <label for="inputState">Country</label>
                        <select id="inputState" class="form-control">
                            {this.state.countries.map((country, c) => (
                                <option key={c}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>
        )
    }
};

export default AddApartment