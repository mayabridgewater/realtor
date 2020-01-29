
import fetcher from '../api/fetcher';


async function getApartmentsFromServer(data) {
    
    try {
        const result = await fetcher.get(`/apartments?${data}`);
        return result.data
    } catch(error) {
        return error
    }
};

async function getApartmentById(id) {
    try {
        const result = await fetcher.get(`/apartments/${id}`);
        return result.data
    }catch(error) {
        return error
    }
}

async function registerUser(data) {
    try {
        const post = await fetcher.post('/signup', data);
    } catch(error) {
        return error
    }
};

async function loginUser(data) {
    try {
        const login = await fetcher.post('/login', data);
        return login
    } catch(error) {
        return false
    }
}

async function getCountries() {
    try {
        const countries = await fetcher.get('/countries');
        return countries.data
    }catch(error) {
        return error
    }
}

async function getCountryById(id) {
    const country = await fetcher.get(`/countries/${id}`);
    console.log(country.data)
    return country.data
}

async function getCitiesByCountry(country_id) {
    try {
        const cities = await fetcher.get(`/cities/${country_id}`);
        return cities.data;
    } catch {

    }
};

async function getCityById(id) {
    const result = await fetcher.get(`/cities/?city_id=${id}`);
    return result.data
}

async function addApartment(data) {
    try {
        const success = await fetcher.post('/apartments', data);
        return success
    } catch(error) {
        return false
    }
}

async function updateApartment(data) {
    const success = await fetcher.put('/apartments', data);
    console.log(success)
    
}

async function getImages(aprtId) {
    if(!aprtId) {
        const images = await fetcher.get('/images');
        return images.data
    }else {
        const images = await fetcher.get(`/images/${aprtId}`);
        return images.data
    }
}

async function getApartmentHistory(apartId) {
    const history = await fetcher.get(`/history/apartment/${apartId}`);
    return history.data
}

async function getUsers(param) {
    const users = await fetcher.get(`/users/?${param}`);
    return users.data
}

async function updateUser(status) {
    const success = await fetcher.put('/users', status);
    console.log(success)
}

async function getUserHistory(query) {
    const userHist = await fetcher.get(`/history/user/?${query}`);
    return userHist.data
}

export {
    getApartmentsFromServer, 
    registerUser,
    loginUser,
    getCountries,
    getCitiesByCountry, 
    addApartment,
    getApartmentById,
    updateApartment,
    getImages,
    getApartmentHistory,
    getUsers,
    updateUser,
    getUserHistory,
    getCityById,
    getCountryById
}