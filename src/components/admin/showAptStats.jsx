import React from 'react';

import ApartmentBox from '../gallery/apartmentBox';

export default class ShowAptStats extends React.Component {
    render() {
        const {apartments} = this.props;
        let status = apartments[0] ? apartments[0].status : '';
        return (
            <div>
                <h3>{status} Apartments</h3>
                <div className='row'>
                    {apartments.map((item, i) => (
                        <div className={'col-md-6 col-lg-4'}>
                            <ApartmentBox {...item} key={i}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}