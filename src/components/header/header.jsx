import React from 'react';
import {navigation} from "./navigation";
import DropDownNav from "./dropDownNav";
import RightNav from "./rightNav";
import {Link} from "react-router-dom";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            burgerMenu: null
        }
    }

    showSideMenu = () => {
        this.setState({
            burgerMenu: !this.state.burgerMenu
        })
    };

    render() {
        return (
            <div className={`container-fluid d-flex justify-content-between ${this.state.burgerMenu ? 'burgerOpen' : ''}`} id={'header'}>
                <div className={'d-flex'}>
                    <div className={'burgerNav d-block d-md-none'} onClick={this.showSideMenu}>
                        <div className={'burgerMenu'}/>
                        <div className={'burgerMenu'}/>
                        <div className={'burgerMenu'}/>
                    </div>
                    {this.state.burgerMenu && <div className={'rightBurger'} onClick={this.showSideMenu}/>}
                    <Link to={'/'}><img alt={'Realtor.com'} src={'./images/logo.png'} style={{width: '180px'}}/></Link>

                    <div className={'menu'}>
                        {navigation.map((item, i) => <DropDownNav {...item} burgerMenu={this.state.burgerMenu} key={i}/>)}
                    </div>

                </div>
                <div>
                    <RightNav login={this.props.login} logout={this.props.logout}/>
                </div>
            </div>
        )
    }
}

export default Header;