// const  getApartmentsFromServer = (handleSubmit) => {
//     fetch(`https://storage.googleapis.com/realtour/apartments-rt.json`, {
//             method: 'GET',
//         }
//     ).then(response => response.json()
//     ).then(success => handleSubmit(success)
//     ).catch(error => console.log(error));
// };
const axios = require('axios');
const  getCitiesFromServer = (handleSubmit) => {
    fetch(`https://storage.googleapis.com/realtour/cities-rt.json`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success => handleSubmit(success)
    ).catch(error => console.log(error));
};


const  getApartmentsFromServer = (handleSubmit) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/apartments`)
        .then(result => resolve(handleSubmit(result.data)))
        .catch(error => console.log(error));
    });
};

export {getApartmentsFromServer, getCitiesFromServer}