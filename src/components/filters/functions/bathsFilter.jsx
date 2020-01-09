const bathsFilter = (numBath, minBath, maxBath, apartments, filter) => {
    return new Promise(function(fulfil, reject) {
        if (!numBath) {
            if (!minBath) {
                minBath = 0
            }
            if (!maxBath) {
                maxBath = 999
            }
            const filteredBaths = apartments.filter(apartment => apartment.number_of_rooms >= minBath && apartment.number_of_rooms <= maxBath);
            fulfil(filter(filteredBaths))
        } else {
            const filteredBaths = apartments.filter(apartment => apartment.number_of_rooms >= numBath);
            fulfil(filter(filteredBaths))
        }
        reject('error')
    });

};

export {bathsFilter}