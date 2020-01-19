import React from 'react';
import ApartmentHeader from "./apartmentheader";
import Carousel from "./carousel";
import Details from "./details";
import {getApartmentById, updateApartment} from "../dataFromToServer";
import ExtraDetails from "./extraDetails";
import DropDown from "./dropDown";
import Footer from "../footer/footer";

class Apartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: [],
            loading: true,
            denied: false,
            approval: undefined,
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        const apartmentId = this.props.match.params.id;
        const apartment = await getApartmentById(apartmentId);
        this.setState({
            apartment,
            loading: false
        })
    };

    handleClick = ({target: {name, value}}) => {
        if (value === 'denied') {
            this.setState({
                denied: true,
                approval: value
            })
        } else if (value === 'approved') {
            this.setState({
                denied: false, 
                approval: value
            })
        }
        if (name === 'description') {
            this.setState({
                description: value
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.state.apartment[0].status = this.state.approval;
        this.state.apartment[0].statusdescription = this.state.description
        // console.log(this.state);
        const result = await updateApartment(this.state.apartment[0]);
        console.log(result)
    }
 
    render() {
        return (
            <div>
                <ApartmentHeader/>
                {this.state.loading ? <p>loading</p> :
                    <div>
                        <h3 className='offset-md-1'>Pending Apartment: </h3>
                        <Carousel apartment={this.state.apartment}/>
                        <Details apartment={this.state.apartment}/>
                        <ExtraDetails/>
                        <DropDown apartment={this.state.apartment}/>
                        <div className='customContainer' style={{paddingBottom: '20px'}}>
                            <form onSubmit={this.handleSubmit}>
                                <label>Approve</label>
                                <input type='radio' name='approval' value='approved' onClick={this.handleClick}></input>
                                <label>Deny</label> 
                                <input type='radio' name='approval' value='denied' onClick={this.handleClick}></input>
                                {this.state.denied && 
                                    <textarea name='description' onBlur={this.handleClick}></textarea>
                                }
                                <input type='submit'/>
                            </form>
                        </div>
                        <Footer id={3}/>
                    </div>
                }
            </div>
        )
    }
}

export default Apartment