const bedsFilter = (numBed, bedMin, bedMax, apartments, filter) => {
    return new Promise(function(fulfil, reject) {
        if (!numBed) {
            if (!bedMin) {
                bedMin = 0
            }
            if (!bedMax) {
                bedMax = 999
            }
            const filteredBeds = apartments.filter(apartment => apartment.number_of_beds >= bedMin && apartment.number_of_beds <= bedMax);
            fulfil(filter(filteredBeds))
        } else {
            const filteredBeds = apartments.filter(apartment => apartment.number_of_beds >= numBed);
            fulfil(filter(filteredBeds))
        }
        reject('error')
    })

};

export {bedsFilter}