import React from 'react';

import Main from "./main";
import WhatsHappening from './whatsHappening';
import Footer from "../footer/footer";
import ApartmentsPreview from './apartmentsPreview';

class Homepage extends React.Component {

    render() {
        return (
            <div>
                <Main/>
                <ApartmentsPreview/>
                <WhatsHappening numOfAvail={this.props.numOfAvail}/>
                <Footer id={1}/>
            </div>
        )
    }
}

export default Homepage