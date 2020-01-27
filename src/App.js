import React from 'react';
import './components/style/style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Gallery from "./components/gallery/gallery";
import Header from "./components/header/header";
import Search from "./components/filters/search";
import Homepage from "./components/homepage/homePage";
import Apartment from "./components/singleapartment/apartment";
import {getApartmentsFromServer} from "./components/dataFromToServer";
import Favorites from "./components/favorites/favoritePage";
import Footer from "./components/footer/footer";
import AddApartment from './components/addApartment';
import AdminMain from './components/admin/adminMain';
import UserProfile from './components/user/profile';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: [],
            filteredApartments: [],
            loading: true,
            favorites: [],
            loggedIn: false,
            numOfAvail: ''
        }
        this.filterApartments = this.filterApartments.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.reset = this.reset.bind(this)
    }
    async componentDidMount() {
        const data = await getApartmentsFromServer('availability=available&status=approved');
        this.setState({
            apartments: data,
            filteredApartments: data,
            loading: false,
            numOfAvail: data.length
        })
    };

    async filterApartments(query) {
        const apartments = await getApartmentsFromServer(query);
        this.setState({
            filteredApartments: apartments
        })
    }

    async reset() {
        const data = await getApartmentsFromServer('availability=available&status=approved');
        this.setState({
            filteredApartments: data
        })
    }

    login() {
        this.setState({
            loggedIn: true,
        })
    } 

    logout() {
        this.setState({
            loggedOut: false,
        })
    }

    render() {
        return (
            <Router>
                {this.state.loading ? <div className="loader"/> :
                <div>
                    <Header login={this.login} logout={this.logout}/>
                    <Switch>
                        <Route path={'/apartments'}>
                            <div>
                                <Search filterApartments={this.filterApartments} reset={this.reset}/>
                                <Gallery apartments={this.state.filteredApartments} numOfAvail={this.state.numOfAvail}/>
                                <Footer id={2}/>
                            </div>
                        </Route>
                        <Route path={'/apartment/:id'} component={Apartment}/>
                        <Route path={'/favorites'}>
                            <Favorites favorites={this.state.favorites} returnFavorites={this.returnFavorites}/>
                            <Footer id={4}/>
                        </Route>
                        <Route path={'/addapartment'}>
                            <AddApartment/>
                        </Route>
                        <Route path={'/admin'}>
                            <AdminMain/>
                        </Route>
                        <Route path={'/userprofile'}>
                            <UserProfile/>
                        </Route>
                        <Route path={'/'}>
                            <Homepage numOfAvail={this.state.numOfAvail}/>
                        </Route>
                    </Switch>

                </div>}
            </Router>
        );
    }
}

export default App;
