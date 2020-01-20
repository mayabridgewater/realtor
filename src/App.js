import React from 'react';
import './components/style/style.css';
import Gallery from "./components/gallery/gallery";
import Header from "./components/header/header";
import Search from "./components/filters/search";
// import {apartments} from "./components/gallery/apartments";
// import {cities} from "./components/gallery/cities";
import {cityFilter} from "./components/filters/functions/cityFilter";
import {priceFilter} from "./components/filters/functions/priceFilter";
import {bedsFilter} from "./components/filters/functions/bedsFilter";
import {bathsFilter} from "./components/filters/functions/bathsFilter";
// import {propertyFilter} from "./components/filters/functions/propertyFilter";
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
    componentDidMount = () => {
        getApartmentsFromServer(this.handleSuccess)
    };

    handleSuccess = (success) => {
        console.log(success);
        this.setState({
            apartments: success,
            updatedApartments: success,
            loading: false
        })
    };

    apartmentsByCity = (id) => {
      const newList = this.state.apartments.filter(apartment => apartment.cityId === id);
      this.setState({
          apartments: newList,
          loading: false
      })
    };

    filtered = (apartments) => {
        this.setState({
            updatedApartments: apartments
        })
    };

    resetSearch = () => {
        this.setState({
            updatedApartments: this.state.apartments
        })
    };

    filterSearch = (data) => {
        const {updatedApartments} = this.state;
        let filteredArray = updatedApartments;

        cityFilter(
            data.city,
            filteredArray,
            (ap) => {filteredArray = ap}).then(
                () => priceFilter(
                    data.minprice,
                    data.maxprice,
                    filteredArray,
                    (ap) => {filteredArray = ap})).then(
                        () => bedsFilter(
                            data.beds,
                            data.minbeds,
                            data.maxbeds,
                            filteredArray,
                            (ap) => {filteredArray = ap})).then(
                                () => bathsFilter(
                                    data.baths,
                                    data.minbaths,
                                    data.maxbaths,
                                    filteredArray,
                                    (ap) => {filteredArray = ap})).then(
                                        () => this.filtered(filteredArray));
        // const dataProperty = [data.pAll, data.pSingle, data.pMulti, data.pCondo, data.pMobile, data.pFarm, data.pLand];
        // let properties = propertyFilter(dataProperty);
    };

    returnFavorites = (apartmentId, isFavorite) => {
        let updatedArray;
        if (isFavorite) {
            updatedArray = [...this.state.favorites, this.state.apartments.find(apartment => apartment.id === apartmentId)]
        } else {
            updatedArray = this.state.favorites.filter(apartment => apartment.id !== apartmentId)
        }
        this.setState({
            favorites: updatedArray
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
