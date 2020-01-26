import React from 'react';

import ApartmentForm from "./apartmentForm";
import Heart from "../favorites/heart";
import {getImages} from '../dataFromToServer';

class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    async componentDidMount() {
        const images = await getImages(this.props.apartment[0].id);
        this.setState({
            images
        })
    }

    render() {
        const {apartment, id, apartments} = this.props;
        return (
                    <div className="row">
                        <div className="col-md-12">

                                <div id="mdb-lightbox-ui"></div>

                                <div className="mdb-lightbox no-margin">

                                    <figure className="col-md-5 col-lg-6" style={{width: '70%', margin: '0 auto'}}>
                                        <a href={'http://localhost:3000/' + apartment[0].main_image} data-size="1600x1067">
                                        <img alt="picture" src={'http://localhost:3000/' + apartment[0].main_image}
                                            className="img-fluid"/>
                                        </a>
                                    </figure>
                                   
                                    <div id="multi-item-example" class="carousel slide carousel-multi-item carousel-multi-item-2" data-ride="carousel">

                                 
                                    <div class="controls-top text-center">
                                        <a class="black-text" href="#multi-item-example" data-slide="prev"><i class="fas fa-angle-left fa-3x pr-3"></i></a>
                                        <a class="black-text" href="#multi-item-example" data-slide="next"><i class="fas fa-angle-right fa-3x pl-3"></i></a>
                                    </div>
                                   

                                    <div class="carousel-inner" role="listbox">

                                        
                                        <div class="carousel-item active">
                                        {this.state.images.map((image, i) => (
                                            <div class="col-md-3 mb-3">
                                                <div class="card">
                                                <img class="img-fluid" src={'http://localhost:3000/' + image.url}
                                                    alt="Card image cap"/>
                                                </div>
                                            </div>
                                        ))}

                                        </div>
                                
                                    </div>
                             
                                    </div>
                                </div>
                                </div>

                         <Heart apartmentId={id} locationId={2} apartments={apartments}/>
                    
                 </div>
        )
    }
}

export default Carousel