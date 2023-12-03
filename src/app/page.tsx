
import { CarCard, CustomFilters, Hero, SearchBar } from '@/components'
import { fetchCars } from '@/utils'
import Image from 'next/image'


export default async function Home() {

  const allCars = await fetchCars() 
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars[0].id; 

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
              <CustomFilters title="fuel" />
              <CustomFilters title="year" />
              
            </div>
          </div>
        </div>

        { isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {
                allCars?.map((car) => (
                  <CarCard car={car} key={car?.id} />
                ))
              }
            </div>
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
