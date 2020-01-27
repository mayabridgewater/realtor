import React from 'react';

import ApartmentBox from "./apartmentBox";


class Gallery extends React.Component {
    render() {
        const {apartments} = this.props;
        return (
            <div id={'apartmentBox'}>
                <p>{this.props.numOfAvail} Available Homes</p>
                <div className={'galleryHeader'}>
                </div>
                <div className={'row'}>
                    {apartments.map((item, i) => (
                        <div id={'container'} className={'col-md-6 col-lg-4'} style={{position: 'relative'}}>
                            <ApartmentBox {...item} key={i}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Gallery;
