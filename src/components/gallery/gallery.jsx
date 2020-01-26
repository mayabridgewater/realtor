import React from 'react';

import ApartmentBox from "./apartmentBox";


class Gallery extends React.Component {
    render() {
        const {apartments} = this.props;
        return (
            <div id={'apartmentBox'} className={'container-fluid'}>
                <div className={'galleryHeader'}>
                    <h3>New York Real Estate & Homes for Sale</h3>
                </div>
                <div className={'row'}>
                    {apartments.map((item, i) => (
                        <div id={'container'} className={'col-sm-6 col-md-4 col-lg-3'} style={{position: 'relative'}}>
                            <ApartmentBox {...item} key={i}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Gallery;
