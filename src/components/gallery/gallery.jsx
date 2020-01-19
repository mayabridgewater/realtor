import React from 'react';

import ApartmentBox from "./apartmentBox";
import {getApartmentsFromServer} from '../dataFromToServer';


class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: [],
            loading: true,
            favorites: [],
            updatedApartments: []
        }
    }
    async componentDidMount() {
        const data = await getApartmentsFromServer();
        this.setState({
            apartments: data,
            loading: false
        })
    };
    render() {
        const {apartments} = this.state;
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
