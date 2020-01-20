import React from 'react';

import ApartmentBox from "./apartmentBox";
import {getApartmentsFromServer} from '../dataFromToServer';


class Gallery extends React.Component {
    render() {
        const {apartments} = this.props;
        return (
<<<<<<< HEAD
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
=======
            <div id={'apartmentBox'} className={'container-fluid'}>
                <div className={'galleryHeader'}>
                    <h3>New York Real Estate & Homes for Sale</h3>
                </div>
                <div className={'row'}>
                    {apartments.map((item, i) => <ApartmentBox {...item} key={i} apartments={apartments}/>)}
>>>>>>> 2fcdedd5eca259d68d672d161673639df54b68ac
                </div>
            </div>
        )
    }
}

export default Gallery;
