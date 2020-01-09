import React from 'react';
import InfoBox from "./infobox";
import {Link} from "react-router-dom";

class CityBox extends React.Component {
    render() {
        const {image, label, description, country, id, apartmentsByCity} = this.props;
        return (
            <div id={'container'} className={'col-sm-6 col-md-4 col-lg-3'}>
                <div className={'box'}>
                    <Link to={'/apartments'}>
                        <div className={'imageBox'} style={{backgroundImage: `url(../images/cities/${image})`}} onClick={() => apartmentsByCity(id)}/></Link>
                    <InfoBox label={label}
                             country={country}
                             description={description}/>
                </div>
            </div>
        )}
}

export default CityBox