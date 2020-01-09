import {cities} from "../../gallery/cities";

const cityFilter = (val, apartments, filter, callback) => {
    return new Promise(function (fulfil, reject) {
        if (!val) {
            fulfil(filter(apartments))
        } else {
            const filteredCities = cities.filter(city => city.label.toLowerCase().includes(val.toLowerCase()));
            const filteredCitiesIds = filteredCities.map(city => city.id);
            const apartment = apartments.filter((apartment) => { return filteredCitiesIds.includes(apartment.cityId)});
            fulfil(filter(apartment))
        }
        reject('error');
    });
};

export {cityFilter}