import axios from "axios";

export async function fetchCars() {
    const headers = {
        'X-RapidAPI-Key': 'd19f8c9e60mshefdfc9f6c933319p144b9cjsn8826e2aa1e09',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    };

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars`;

    const response = await axios.get(url, {
        params: {
            model: 'corolla'
        },
        headers,
    });

    return response.data;

}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.5;

    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0)
}