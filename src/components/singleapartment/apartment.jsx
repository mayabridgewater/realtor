import React from 'react';
import ApartmentHeader from "./apartmentheader";
import Carousel from "./carousel";
import Details from "./details";
import {getApartmentsFromServer} from "../dataFromToServer";
import ExtraDetails from "./extraDetails";
import DropDown from "./dropDown";
import Footer from "../footer/footer";

class Apartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: [],
            loading: true
        }
    }
    componentDidMount = () => {
        getApartmentsFromServer(this.handleSuccess)
    };

    handleSuccess = (success) => {
        this.setState({
            apartments: success,
            loading: false
        });
    };
    render() {
        const apartmentId = this.props.match.params.id;
        const apartment = this.state.apartments.find(single => single.id === parseInt(apartmentId));
        return (
            <div>
                <ApartmentHeader/>
                {this.state.loading ? <p>loading</p> :
                    <div>
                        <Carousel apartment={apartment} id={apartmentId} apartments={this.state.apartments}/>
                        <Details apartment={apartment}/>
                        <ExtraDetails/>
                        <DropDown apartment={apartment}/>
                        <Footer id={3}/>
                    </div>
                }
            </div>
        )
    }
}

export default Apartment