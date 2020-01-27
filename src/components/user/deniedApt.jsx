import React from 'react';

import {getApartmentHistory, updateApartment} from '../dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';
import UpdateApt from './updateApt';

export default class DeniedApt extends React.Component {
    constructor() {
        super();
        this.state = {
            denied: null,
            update: false
        }
        this.updateApt = this.updateApt.bind(this);
        this.removeApt = this.removeApt.bind(this);
    }

    async componentDidMount() {
        const aprtId = this.props.apartment.id;
        const denied = await getApartmentHistory(aprtId);
        console.log(denied);
        this.setState({
            denied: denied[0]
        })
    }

    updateApt() {
        this.setState({
            update: !this.state.update
        })
    }

    async removeApt() {
        this.props.apartment.status = 'removed';
        await updateApartment(this.props.apartment);
        window.location.replace('/userprofile');
    }

    render() {
        return (
            <div>
                <ApartmentBox {...this.props.apartment}/>
                <p>Why your apartment was denied: </p>
                <div style={{border: '1px solid', width: '200px', height: '70px'}}>
                    {this.state.denied && <p>{this.state.denied.description}</p>}
                </div>
                <button onClick={this.updateApt}>Update</button>
                <button onClick={this.removeApt} id={this.props.apartment.id}>Delete</button>
                {this.state.update && <UpdateApt apartment={this.props.apartment}/>}
            </div>
        )
    }
}