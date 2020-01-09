import React from 'react'
import {Link} from "react-router-dom";

class Main extends React.Component {
    render() {
        return (
            <div className={'main'} style={{background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(./images/fallhouse.jpg)", backgroundPosition: 'center'}}>
                <h1 className="text-lg-center">The Home of Home Search</h1>
                <h2 className="d-none d-lg-block text-center">With the most complete source of homes for sale & real
                    estate near you</h2>
                <ul className="navList">
                    <li>BUY</li>
                    <li>RENT</li>
                    <li>JUST SOLD</li>
                    <li className="d-none d-md-inline-block">HOME VALUE</li>
                </ul>
                <form className="d-flex justify-content-lg-center">
                    <input type="text" name="search" defaultValue={"New York, NY"}/>
                    <Link to={'/apartments'}><button>Search</button></Link>
                </form>
            </div>
        )
    }
}

export default Main