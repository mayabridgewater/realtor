import React from 'react';
import CityBox from "./cityBox";
import {getCitiesFromServer} from "../dataFromServer";

class CityGallery extends React.Component {
    constructor(){
        super();
        this.state = {
            cities: []
        }
    }

    componentDidMount() {
        getCitiesFromServer(this.handleSuccess)
    }

    handleSuccess = (success) => {
        this.setState({
            cities: success
        });
    };

    render() {
        const {apartmentsByCity} = this.props;
        return (
            <div className={'cityBox container-fluid'}>
                <div className={'row'}>
                    {this.state.cities.map((item, i) => <CityBox {...item} key={i} apartmentsByCity={apartmentsByCity}/>)}
                </div>
            </div>
        )
    }
}

export default CityGallery