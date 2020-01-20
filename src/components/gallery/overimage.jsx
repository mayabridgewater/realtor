import React from 'react';

import convertMS from './convertMS';

class OverImage extends React.Component {
    constructor() {
        super();
        this.state = {
            newTime: '',
            sale_type: ''
        }
    }

    componentDidMount() {
        const milliseconds = Math.abs(new Date() - new Date(this.props.date));
        const conversions = convertMS(milliseconds);
        let sale = this.props.sale_status;
        if (this.props.sale_status === 'both') {
            sale = 'Rent/Sale'
        }
        this.setState({
            newTime: conversions,
            sale_status: sale
        })
    }

    render() {
        const {price, property_type} = this.props;
        return(
            <div>
                <p className={'absTopBox'}>NEW-{this.state.newTime.hour} HOURS AGO</p>
                <div className={'absBottomBox'}>
                <p>{property_type} for {this.state.sale_status}</p>
                    <p className={'price'}>${price}</p>
                </div>
            </div>
        )
    }
}

export default OverImage