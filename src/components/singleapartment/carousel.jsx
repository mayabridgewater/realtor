import React from 'react';
import InnerCarousel from "./innerCarousel";
import ApartmentForm from "./apartmentForm";
import Heart from "../favorites/heart";

class Carousel extends React.Component {
    render() {
        const {apartment, id, apartments} = this.props;
        console.log(apartment)
        return (
                <div className={'customContainer carouselWrapper'}>
                     {/*<p className={'presentedBy'}>Presented by: </p>*/}
                     {/*<p className={'presentedBy'}><span>{apartment.agent}</span> with <span>{apartment.agency}</span></p>*/}
                     <div className={'outerCarousel'}>
                         <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                             <div className="carousel-inner">
                                 <div className="carousel-item active">
                                     <img className="d-block w-100" src={'http://localhost:3000/' + apartment[0].main_image} alt="First slide"/>
                                 </div>
                                 {/* {apartment.images.map((picture, p) => <InnerCarousel image={picture} key={p}/>)} */}
                             </div>
                             <a className="carousel-control-prev" href={"#carouselExampleControls"} role="button" data-slide="prev">
                                 <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                 <span className="sr-only">Previous</span>
                             </a>
                             <a className="carousel-control-next" href={"#carouselExampleControls"} role="button" data-slide="next">
                                 <span className="carousel-control-next-icon" aria-hidden="true"/>
                                 <span className="sr-only">Next</span>
                             </a>
                         </div>
                         <div className={'overText'}>
                             {apartment.for_sale ? <p>For Sale</p> : <p>For Rent</p>}
                         </div>
                         <ApartmentForm address={apartment.address}/>
                         <Heart apartmentId={id} locationId={2} apartments={apartments}/>
                     </div>
                 </div>
        )
    }
}

export default Carousel