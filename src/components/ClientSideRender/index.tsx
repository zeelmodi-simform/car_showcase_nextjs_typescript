'use client'

import React, { useEffect, useState } from 'react'
import { fetchCars } from '@/utils';
import { CarCard, CustomFilters, Hero, SearchBar, ShowMore } from '..';
import { fuels, yearsOfProduction } from '@/constants';
import Image from 'next/image';

const ClientSideRender = () => {

    const [allCars, setAllCars] = useState([])
    const [loading, setLoading] = useState(false)

    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const [fuel, setFuel] = useState('')
    const [year, setYear] = useState(2022);

    const [limit, setLimit] = useState(10);

    const getCars = async () => {
        setLoading(true);
        try {
            const result = await fetchCars({
                manufacturer,
                model,
                year,
                fuel,
                limit
            })
            setAllCars(result);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getCars()
    }, [fuel, year, limit, model, manufacturer])
    
    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  

    return (
        <main className="overflow-hidden">
            <Hero />
            <div className='mt-12 padding-x padding-y max-width' id='discover'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>
                        Car Catalogue
                    </h1>
                    <p>
                        Explore the cars you might like
                    </p>
                    <div className='home__filters'>
                        <SearchBar setManufacturer={ setManufacturer } setModel={ setModel } isClient />

                        <div className='home__filter-container'>
                            <CustomFilters title="fuel" options={ fuels } setFilter={setFuel} isClient />
                            <CustomFilters title="year" options={ yearsOfProduction } setFilter={setYear} isClient />
              
                        </div>
                    </div>
                </div>

                { allCars.length > 0 ? (
                    <section>
                        <div className='home__cars-wrapper'>
                            {
                                allCars?.map((car: any) => (
                                    <CarCard car={ car } key={ car?.id } />
                                ))
                            }
                        </div>
                        { loading && (
                            <div className='mt-16 w-full flex-center'>
                                <Image src={"/loader.svg"} alt='loader' width={50} height={50} className='object-contain' />
                            </div>
                        ) }

                        <ShowMore
                            pageNumber={ limit / 10 }
                            isNext={ limit > allCars.length }
                            isClient
                            setLimit={ setLimit }
                        />
                    </section>
                ) : (
                    <div className='home__error-container'>
                        <h2 className='text-black text-xl font-bold'>
                            Oops, no results
                        </h2>
                        <p>
                            { allCars?.message }
                        </p>
                    </div>
                ) }

            </div>
        </main>
    )

};

export default ClientSideRender
