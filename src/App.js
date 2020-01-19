import React from 'react';
import './components/style/style.css';
import Gallery from "./components/gallery/gallery";
import Header from "./components/header/header";
import Search from "./components/filters/search";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Homepage from "./components/homepage/homePage";
import Apartment from "./components/singleapartment/apartment";
import {getApartmentsFromServer} from "./components/dataFromToServer";
import Favorites from "./components/favorites/favoritePage";
import Footer from "./components/footer/footer";
import AddApartment from './components/addApartment';
import AdminSignUp from './components/admin/adminSignup';
import AdminMain from './components/admin/adminMain';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: [],
            loading: true,
            favorites: []
        }
        this.filterApartments = this.filterApartments.bind(this)
    }
    async componentDidMount() {
        try {
            const data = await getApartmentsFromServer();
            this.setState({
                apartments: data,
                loading: false
            })
        } catch (error) {
            console.log(error)
        }
    };

    async filterApartments(query) {
        const apartments = await getApartmentsFromServer(query);
        this.setState({
            apartments: apartments
        })
    }

    render() {
        console.log(this.state.apartments)
        return (
            <Router>
                {this.state.loading ? <div className="loader"/> :
                <div>
                    <Switch>
                        <Route path={'/apartments'}>
                            <div>
                                <Header/>
                                <Search filterApartments={this.filterApartments}/>
                                <Gallery apartments={this.state.apartments}/>
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
                        <Route path={'/'}>
                            <Homepage returnFavorites={this.returnFavorites} favorites={this.state.favorites}/>
                        </Route>
                    </Switch>

                </div>}
            </Router>
        );
    }
}

export default App;
