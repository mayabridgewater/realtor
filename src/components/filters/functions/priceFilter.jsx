const priceFilter = (min, max, apartments, filter) => {
    return new Promise(function(fulfil, reject) {
        let filteredPrice = [];
        if (max === 'Any Price') {
            max = Infinity
        }
        if (!min) {
            min = 0
        }
        if (!max) {
            max = Infinity
        }
        for (let i = 0; i < apartments.length; i++) {
            const price = apartments[i].price * 1000000;
            if (price >= min && price <= max) {
                filteredPrice.push(apartments[i])
            }
        }
        fulfil(filter(filteredPrice));
        reject('error');
    });
};

export {priceFilter}