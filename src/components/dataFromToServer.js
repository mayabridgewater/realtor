
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
        console.log(post)
    } catch(error) {
        console.log(error);
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

async function getCitiesByCountry(country_id) {
    try {
        const cities = await fetcher.get(`/cities/${country_id}`);
        return cities.data;
    } catch {

    }
};

async function addApartment(data) {
    try {
        const success = await fetcher.post('/apartments', data);
        return success
    } catch(error) {
        return false
    }
}

async function updateApartment(data) {
    // console.log(data);
    const success = await fetcher.put('/apartments', data);
    console.log(success)
    
}

async function getImages(aprtId) {
    const images = await fetcher.get(`/images/${aprtId}`);
    return images.data
}

async function getApartmentHistory(apartId) {
    const history = await fetcher.get(`/history/apartment/${apartId}`);
    return history.data
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
    getApartmentHistory
}