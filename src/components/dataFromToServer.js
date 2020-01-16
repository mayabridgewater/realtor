
import fetcher from '../api/fetcher';

async function getApartmentsFromServer() {
    try {
        const result = await fetcher.get(`/apartments`);
        return result.data
    } catch(error) {
        return error
    }
};

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
        return error
    }
}

async function getCountries() {
    try {
        const countries = await fetcher.get('/countries');
        return(countries.data)
    }catch(error) {
        return error
    }
}

export {
    getApartmentsFromServer, 
    registerUser,
    loginUser,
    getCountries,
}