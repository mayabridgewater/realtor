import React from 'react';
import ApartmentBox from "./apartmentBox";
import {Link} from "react-router-dom";

class Gallery extends React.Component {
    render() {
        const {apartments, returnFavorites} = this.props;
        const length = apartments.length;
        return (
                <div id={'apartmentBox'} className={'container-fluid'}>
                    {apartments.length > 4 &&
                    <div className={'galleryHeader'}>
                        <h3>New York Real Estate & Homes for Sale</h3>
                    </div>
                    }
                    <div className={'row'}>
                        {apartments.map((item, i) => <ApartmentBox {...item} length={apartments.length} key={i} apartments={apartments} returnFavorites={returnFavorites}/>)}
                    </div>
                    {apartments.length > 4 && <Link to={'/cities'}><div className={'cityBtn'}><button>Cities</button></div></Link>}
                </div>
        )
    }
}

export default Gallery;
