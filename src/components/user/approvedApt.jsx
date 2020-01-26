import React from 'react';

import ApartmentBox from '../gallery/apartmentBox';
import UpdateApt from './updateApt';
import {updateApartment} from '../dataFromToServer';

export default class ApprovedApt extends React.Component {
    constructor() {
        super();
        this.state = {
            updateApartment: false
        };
        this.updateApt = this.updateApt.bind(this);
        this.removeApt = this.removeApt.bind(this);
    }

    updateApt() {
        this.setState({
            updateApartment: !this.state.updateApartment
        })
    }

    async removeApt() {
        this.props.apartment.status = 'removed';
        await updateApartment(this.props.apartment);
        window.location.replace('/userprofile');
    }

    render() {
        return (
            <div className={'col-sm-6 col-md-4 col-lg-3'}>
                <ApartmentBox {...this.props.apartment}/>
                <button onClick={this.updateApt} id={this.props.apartment.id}>Update</button>
                <button onClick={this.removeApt} id={this.props.apartment.id}>Sold</button>
                {this.state.updateApartment && <UpdateApt apartment={this.props.apartment}/>}
            </div>
        )
    }
}