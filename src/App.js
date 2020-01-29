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
            numOfAvail: ''
        }
        this.filterApartments = this.filterApartments.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.reset = this.reset.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    async componentDidMount() {
        const data = await getApartmentsFromServer('availability=available&status=approved&size=4');
        this.setState({
            apartments: data.apartments,
            filteredApartments: data.apartments,
            loading: false,
            count: data.amount[0].count
        })
    };

    async nextPage(page) {
        console.log(page)
        // const data = await getApartmentsFromServer(`page=${page}&availability=available&status=approved&size=4`);
        // this.setState({
        //     filterApartments: data.apartments
        // })
    }

    async filterApartments(query) {
        const apartments = await getApartmentsFromServer(query);
        this.setState({
            filteredApartments: apartments.apartments
        })
    }

    async reset() {
        const data = await getApartmentsFromServer('availability=available&status=approved');
        this.setState({
            filteredApartments: data.apartments
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
                            <Homepage numOfAvail={this.state.count}/>
                            <Footer/>
                        </Route>
                    </Switch>
                </div>}
            </Router>
        );
    }
}

export default App;
