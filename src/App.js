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
import {getApartmentsFromServer} from "./api/dataFromToServer";
import Footer from "./components/footer/footer";
import AddApartment from './components/user/addApartment';
import AdminMain from './components/admin/adminMain';
import UserProfile from './components/user/profile';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            apartments: [],
            filteredApartments: [],
            count: '',
            loading: true,
            favorites: [],
            loggedIn: false,
            numOfAvail: '',
            defaultQuery: {availability: 'available', status: 'approved', size: 9},
            searchQuery: {availability: 'available', status: 'approved', size: 9}
        }
        this.filterApartments = this.filterApartments.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.reset = this.reset.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    async componentDidMount() {
        const data = await getApartmentsFromServer(this.state.defaultQuery);
        this.setState({
            apartments: data.apartments,
            filteredApartments: data.apartments,
            loading: false,
            count: data.amount[0].count
        })
    };

    async nextPage(page) {
        let query = {...this.state.searchQuery};
        query.page = page;
        const data = await getApartmentsFromServer(query);
        this.setState({
            filteredApartments: data.apartments
        })
    }

    async filterApartments(query) {
        let search = {...this.state.searchQuery};
        for (let prop in query) {
            search[prop] = query[prop]
        }
        const apartments = await getApartmentsFromServer(search);
        console.log(apartments)
        this.setState({
            filteredApartments: apartments.apartments,
            count: apartments.amount[0].count,
            searchQuery: search
        })
    }

    async reset() {
        const data = await getApartmentsFromServer(this.state.defaultQuery);
        this.setState({
            filteredApartments: data.apartments,
            count: data.amount[0].count,
            searchQuery: this.state.defaultQuery
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
                                <Gallery apartments={this.state.filteredApartments} numOfAvail={this.state.count} nextPage={this.nextPage}/>
                                <Footer/>
                            </div>
                        </Route>
                        <Route path={'/apartment/:id'} component={Apartment}/>
                        <Route path={'/addapartment'}>
                            <AddApartment/>
                            <Footer/>
                        </Route>
                        <Route path={'/admin'}>
                            <AdminMain/>
                            <Footer/>
                        </Route>
                        <Route path={'/userprofile'}>
                            <UserProfile loading={this.state.loading}/>
                            <Footer/>
                        </Route>
                        <Route path={'/'}>
                            <Homepage/>
                            <Footer/>
                        </Route>
                    </Switch>
                </div>}
            </Router>
        );
    }
}

export default App;
