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

                                    <figure className="col-md-4">
                                        <a href={'http://localhost:3000/' + apartment[0].main_image} data-size="1600x1067">
                                        <img alt="picture" src={'http://localhost:3000/' + apartment[0].main_image}
                                            className="img-fluid"/>
                                        </a>
                                    </figure>
                                    {this.state.images.map((image, i) => (
                                        <figure className="col-md-4" key={i}>
                                        <a href={'http://localhost:3000/' + image.url} data-size="1600x1067">
                                        <img alt="picture" src={'http://localhost:3000/' + image.url}
                                            className="img-fluid" />
                                        </a>
                                    </figure>
                                    ))}

                                </div>

                            </div>
                       
                         {/* <div className={'overText'}>
                            {apartment[0].sale_status === 'both' ? <p>For Sale/Rent</p> : <p>For {apartment[0].sale_status}</p>}
                         </div> */}
                         <ApartmentForm address={apartment[0].address}/>
                         <Heart apartmentId={id} locationId={2} apartments={apartments}/>
                    
                 </div>
        )
    }
}

export default Carousel

{/* <div className={'customContainer carouselWrapper'}>
                //      {/*<p className={'presentedBy'}>Presented by: </p>*/}
                //      {/*<p className={'presentedBy'}><span>{apartment.agent}</span> with <span>{apartment.agency}</span></p>*/}
                //      <div className={'outerCarousel'}>
                //          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                //              <div className="carousel-inner">
                //                  <div className="carousel-item active">
                //                      <img className="d-block w-100" src={'http://localhost:3000/' + apartment[0].main_image} alt="First slide"/>
                //                  </div>
                //                  {/* {apartment.images.map((picture, p) => <InnerCarousel image={picture} key={p}/>)} */}
                //              </div>
                //              <a className="carousel-control-prev" href={"#carouselExampleControls"} role="button" data-slide="prev">
                //                  <span className="carousel-control-prev-icon" aria-hidden="true"/>
                //                  <span className="sr-only">Previous</span>
                //              </a>
                //              <a className="carousel-control-next" href={"#carouselExampleControls"} role="button" data-slide="next">
                //                  <span className="carousel-control-next-icon" aria-hidden="true"/>
                //                  <span className="sr-only">Next</span>
                //              </a>
                //          </div> */}