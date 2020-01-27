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
            <div className={'col-md-6 col-lg-4'}>
                <ApartmentBox {...this.props.apartment}/>
                <div style={{margin: '10px'}}>
                    <button onClick={this.updateApt} id={this.props.apartment.id} className='aptBtn'>Update</button>
                    <button onClick={this.removeApt} id={this.props.apartment.id} className='aptBtn'>Sold</button>
                </div>
                {this.state.updateApartment && <UpdateApt apartment={this.props.apartment}/>}
            </div>
        )
    }
}