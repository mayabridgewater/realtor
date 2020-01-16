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
import {getApartmentsFromServer} from "./components/dataFromServer";
import CityGallery from "./components/gallery/cityGallery";
import Favorites from "./components/favorites/favoritePage";
import Footer from "./components/footer/footer";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: [],
            loading: true,
            favorites: [],
            updatedApartments: []
        }
    }
    async componentDidMount() {
        try {
            const data = await getApartmentsFromServer();
            this.handleSuccess(data)
        } catch (error) {
            this.handleSuccess(error)
        }
    };

    handleSuccess = (success) => {
        this.setState({
            apartments: success,
            updatedApartments: success,
            loading: false
        })
    };

    render() {
        const {updatedApartments} = this.state;
        return (
            <Router>
                {this.state.loading ? <div className="loader"/> :
                <div>
                    <Switch>
                        <Route path={'/apartments'}>
                            <div>
                                <Header/>
                                <Search filterSearch={this.filterSearch} aptLength={updatedApartments.length} reset={this.resetSearch}/>
                                <Gallery apartments={updatedApartments} returnFavorites={this.returnFavorites}/>
                                <Footer id={2}/>
                            </div>
                        </Route>
                        <Route path={'/cities'}>
                            <Header/>
                            <CityGallery apartmentsByCity={this.apartmentsByCity}/>
                        </Route>
                        <Route path={'/apartment/:id'} component={Apartment}/>
                        <Route path={'/favorites'}>
                            <Favorites favorites={this.state.favorites} returnFavorites={this.returnFavorites}/>
                            <Footer id={4}/>
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
