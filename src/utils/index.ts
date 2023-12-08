import { CarProps, FilterProps } from "@/types";
import axios from "axios";
import exp from "constants";

export async function fetchCars(filters: FilterProps) {
    const headers = {
        'X-RapidAPI-Key': 'd19f8c9e60mshefdfc9f6c933319p144b9cjsn8826e2aa1e09',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    };

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars`;

    const response = await axios.get(url, {
        params: {
            // model: 'corolla'
            // model: 'carrera'
            // model: 'q3'
            make: filters.manufacturer,
            year: filters.year,
            model: filters.model,
            limit: filters.limit,
            fuel_type: filters.fuel,
        },
        headers,
    });

    // console.log({data: response.data});
    

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
};

export const generateCareImageUrl = (car: CarProps, angel?: string ) => {
    const url = new URL(`https://cdn.imagin.studio/getimage`);
    
    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', car.make);
    url.searchParams.append('modelFamily', car.model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullScreen');
    url.searchParams.append('modelYear', `${car.year}`);
    url.searchParams.append('angle', `${angel}`);

    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value,);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathname
}