import { fetchCars } from '@/utils';
import React from 'react'
import { CarCard, CustomFilters, Hero, SearchBar, ShowMore } from '..';
import { fuels, yearsOfProduction } from '@/constants';

const ServerSideRender = async ({ searchParams }: any) => {
 const allCars = await fetchCars({
    manufacturer: searchParams?.manufacturer ?? '',
    model: searchParams?.model ?? '',
    year: searchParams?.year ?? 2022,
    fuel: searchParams?.fuel ?? '',
    limit: searchParams?.limit ?? 10
  });
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
            <SearchBar />

            <div className='home__filter-container'>
              <CustomFilters title="fuel" options={fuels} />
              <CustomFilters title="year" options={yearsOfProduction} />
              
            </div>
          </div>
        </div>

        { !isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {
                allCars?.map((car: any) => (
                  <CarCard car={car} key={car?.id} />
                ))
              }
            </div>
            <ShowMore
              pageNumber={ (searchParams.limit ?? 10) / 10 }
              isNext={ (searchParams.limit ?? 10) > allCars.length } />
          </section>
        ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>
                Oops, no results
              </h2>
              <p>
                {allCars?.message}
              </p>
            </div>
        )}

      </div>
    </main>
  )
}

export default ServerSideRender
