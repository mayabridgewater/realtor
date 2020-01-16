const axios = require('axios');

const  getCitiesFromServer = (handleSubmit) => {
    fetch(`https://storage.googleapis.com/realtour/cities-rt.json`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success => handleSubmit(success.data)
    ).catch(error => console.log(error));
};

async function getApartmentsFromServer() {
    try {
        const result = await axios.get(`http://localhost:3000/apartments`);
        return result.data
    } catch(error) {
        return error
    }
};
// axios.get(`http://localhost:3000/`)
//         .then(result => console.log(result.data))


export {getApartmentsFromServer, getCitiesFromServer}