import React from 'react';
import {homepagePopular} from "./directoryLists/popular";
import InnerBottom from "./innerBottom";

class BottomDirectory extends React.Component {
    render() {
        return (
            <div className={'bottomDirectory'}>
                <div className={'container'}>
                    <div className={'row'}>
                        {homepagePopular.map((object, o) => <InnerBottom {...object} id={o} key={o}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomDirectory