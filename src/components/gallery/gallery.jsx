import React from 'react';
import ApartmentBox from "./apartmentBox";
import {Link} from "react-router-dom";

class Gallery extends React.Component {
    render() {
        const {apartments, returnFavorites} = this.props;
        return (
            <div id={'apartmentBox'} className={'container-fluid'}>
                <div className={'galleryHeader'}>
                    <h3>New York Real Estate & Homes for Sale</h3>
                </div>
                <div className={'row'}>
                    {apartments.map((item, i) => <ApartmentBox {...item} key={i} apartments={apartments}/>)}
                </div>
            </div>
        )
    }
}

export default Gallery;
