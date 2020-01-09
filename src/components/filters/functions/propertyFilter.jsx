import {apartments} from "../../gallery/apartments";

const propertyFilter = (prop) => {
    let count = 0;
    for (let i = 0; i < prop.length; i++) {
        if (!prop[i]) {
            count++;
        }
    }
    if (count == prop.length) {
        return apartments
    } else {
        const filteredProperty = apartments.filter(apt => prop.includes(apt.property));
        return filteredProperty
    }
};

export {propertyFilter}