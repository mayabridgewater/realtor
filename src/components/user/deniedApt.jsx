import React from 'react';

import {getApartmentHistory} from '../dataFromToServer';
import ApartmentBox from '../gallery/apartmentBox';

export default class DeniedApt extends React.Component {
    constructor() {
        super();
        this.state = {
            denied: null
        }
    }

    async componentDidMount() {
        const aprtId = this.props.apartment.id;
        const denied = await getApartmentHistory(aprtId);
        console.log(denied);
        this.setState({
            denied: denied[0]
        })
    }
    render() {
        return (
            <div>
                <ApartmentBox {...this.props.apartment}/>
                <div>
                    {this.state.denied && <p>{this.state.denied.description}</p>}
                </div>
            </div>
        )
    }
}