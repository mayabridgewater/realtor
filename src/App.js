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
<<<<<<< HEAD
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
=======
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
>>>>>>> 2fcdedd5eca259d68d672d161673639df54b68ac
    };

    async filterApartments(query) {
        const apartments = await getApartmentsFromServer(query);
        this.setState({
            apartments: apartments
        })
    }

    render() {
<<<<<<< HEAD
        const {updatedApartments} = this.state;
=======
        console.log(this.state.apartments)
>>>>>>> 2fcdedd5eca259d68d672d161673639df54b68ac
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
