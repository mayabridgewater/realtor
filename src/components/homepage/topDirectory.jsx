import React from 'react';
import {narList} from "./directoryLists/nar";
import InnerTop from "./innerTop";

class TopDirectory extends React.Component {
    render() {
        return (
            <div className={'topDirectory'}>
                <div className={'container '}>
                    <div className={'row'}>
                        <div className={'col-md-6 col-lg-3'}>
                            <img src={'./images/nar.png'} alt={''}/>
                            <p>Find out how the NAR works for consumers and REALTORS</p>
                        </div>
                        {narList.map((list, l) => <InnerTop {...list} key={l}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default TopDirectory