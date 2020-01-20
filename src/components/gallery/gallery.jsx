import React from 'react';

import ApartmentBox from "./apartmentBox";
import {getApartmentsFromServer} from '../dataFromToServer';


class Gallery extends React.Component {
    render() {
        const {apartments} = this.props;
        return (
            <div id={'apartmentBox'} className={'container-fluid'}>
                <div className={'galleryHeader'}>
                    <h3>New York Real Estate & Homes for Sale</h3>
                </div>
                <div className={'row'}>
                    {apartments.map((item, i) => <ApartmentBox {...item} key={i}/>)}
                </div>
            </div>
        )
    }
}

export default Gallery;
