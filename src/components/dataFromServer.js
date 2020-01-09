const  getApartmentsFromServer = (handleSubmit) => {
    fetch(`https://storage.googleapis.com/realtour/apartments-rt.json`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success => handleSubmit(success)
    ).catch(error => console.log(error));
};

const  getCitiesFromServer = (handleSubmit) => {
    fetch(`https://storage.googleapis.com/realtour/cities-rt.json`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success => handleSubmit(success)
    ).catch(error => console.log(error));
};

export {getApartmentsFromServer, getCitiesFromServer}