import React from 'react';
import Cookies from 'js-cookie';

import Carousel from "./carousel";
import Details from "./details";
import {getApartmentById, updateApartment} from "../dataFromToServer";
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
        this.state.apartment[0].statusdescription = this.state.description;
        const result = await updateApartment(this.state.apartment[0]);
        window.location.replace('/admin');
    }
 
    render() {
        return (
            <div>
                {this.state.loading ? <p>loading</p> :
                    <div>
                        {this.state.apartment[0].status === 'pending' && <h3 className='offset-1'>Pending Apartment: </h3>}
                        <Carousel apartment={this.state.apartment}/>
                        <Details apartment={this.state.apartment}/>
                        <DropDown apartment={this.state.apartment}/>
                        {this.state.apartment[0].status === 'pending' &&
                        <div className='customContainer approval'>
                            <form onSubmit={this.handleSubmit}>
                                <label className='statusChange'>
                                    <input type='radio' name='approval' value='approved' className={'prop-type-cb radiobtn'} onClick={this.handleClick}/>
                                    <img src={'../images/correct.png'} alt={''}/>
                                </label>
                                <label className='statusChange'>
                                    <input type='radio' name='approval' value='denied' className={'prop-type-cb radiobtn'} onClick={this.handleClick}></input>
                                    <img src={'../images/delete-button.png'} alt={''}/>
                                </label> 
                                {this.state.denied && 
                                <div>
                                    <textarea name='description' onBlur={this.handleClick}></textarea>
                                </div>
                                }
                                <div>
                                    <input type='submit' className='aptBtn'/>
                                </div>
                            </form>
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Apartment