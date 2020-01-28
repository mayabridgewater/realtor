import React from 'react';

import Main from "./main";
import WhatsHappening from './whatsHappening';
import ApartmentsPreview from './apartmentsPreview';

class Homepage extends React.Component {

    render() {
        return (
            <div>
                <Main/>
                <ApartmentsPreview/>
                <WhatsHappening numOfAvail={this.props.numOfAvail}/>
            </div>
        )
    }
}

export default Homepage