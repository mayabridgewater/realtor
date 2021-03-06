import React from 'react';
import RightNav from "./rightNav";
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className={`container-fluid d-flex justify-content-between`} id={'header'}>
                <div className={'d-flex'}>
                    <Link to={'/'}><img alt={'Realtor.com'} src={'../images/logo.jpg'} style={{width: '122px'}}/></Link>
                    <Link to={'/apartments'}><p>Search</p></Link>


                </div>
                <div>
                    <RightNav login={this.props.login} logout={this.props.logout}/>
                </div>
            </div>
        )
    }
}

export default Header;