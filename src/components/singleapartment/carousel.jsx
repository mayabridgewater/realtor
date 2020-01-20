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
        const images = await getImages(this.props.apartment[0].id)
    }

    render() {
        const {apartment, id, apartments} = this.props;
        return (
                    <div class="row">
                    <div class="col-md-12">

                            <div id="mdb-lightbox-ui"></div>

                            <div class="mdb-lightbox no-margin">

                                <figure class="col-md-4">
                                    <a href={'http://localhost:3000/' + apartment[0].main_image} data-size="1600x1067">
                                    <img alt="picture" src={'http://localhost:3000/' + apartment[0].main_image}
                                        class="img-fluid"/>
                                    </a>
                                </figure>
                                {}

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(98).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(131).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(123).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(118).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(128).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(132).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(115).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

                                <figure class="col-md-4">
                                    <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg" data-size="1600x1067">
                                    <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(133).jpg"
                                        class="img-fluid" />
                                    </a>
                                </figure>

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