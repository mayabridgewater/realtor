import React from 'react';

import ApartmentBox from '../gallery/apartmentBox';

export default class ShowAptStats extends React.Component {
    render() {
        const {apartments} = this.props;
        let status = this.props.status;
        return (
            <div>
                <h3>{status === 'pending' && 'Pending'} 
                    {status === 'approved' && 'Active'} 
                    {status === 'denied' && 'Denied'} 
                    {status === 'removed' && 'Sold/Removed'} Apartments</h3>
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