import React from 'react';

import ApartmentBox from '../gallery/apartmentBox';
import { Link } from 'react-router-dom';
import UpdateApt from './updateApt';

export default class ApprovedApt extends React.Component {
    constructor() {
        super();
        this.state = {
            updateApartment: false
        };
        this.updateApt = this.updateApt.bind(this);
    }

    updateApt() {
        this.setState({
            updateApartment: !this.state.updateApartment
        })
    }

    render() {
        return (
            <div>
                <ApartmentBox {...this.props.apartment}/>
                <button onClick={this.updateApt} id={this.props.apartment.id}>Update</button>
                {this.state.updateApartment && <UpdateApt apartment={this.props.apartment}/>}
            </div>
        )
    }
}