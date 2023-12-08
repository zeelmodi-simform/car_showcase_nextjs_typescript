'use client'

import React, { FormEvent, useState } from 'react'
import { SearchButton, SearchManufacturer } from '..';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchBar = ({ setManufacturer, setModel, isClient = false }) => {

  const router = useRouter()

  const [searchManufacturer, setSearchManufacturer] = useState('')
  const [searchModel, setSearchModel] = useState('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchManufacturer === '' && searchModel === '') {
      return alert('Please fill in the search bar')
    }
    // e.g. audi q5
    if(isClient) {
      setManufacturer(searchManufacturer)
      setModel(searchModel)
    }
    else {
      updateSearchParams(searchModel.toLowerCase(), searchManufacturer.toLowerCase())
    }
  }
  
  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set('model', model);
    }
    else {
      searchParams.delete('model');
    }

    if(manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    }
    else {
      searchParams.delete('manufacturer');
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className='searchbar' onSubmit={ handleSearch }>
      <div className='searchbar__item'>
        <SearchManufacturer manufacturer={ searchManufacturer } setManufacturer={ setSearchManufacturer } />
        <SearchButton otherClasses={ `sm:hidden` } />
      </div>

      <div className='searchbar__item'>
        <Image src={ '/model-icon.png' } width={ 25 } height={ 25 } className='absolute w-[20px] h-[20px] ml-4' alt="car model" />
        <input
          type="text"
          name="model"
          value={ searchModel }
          onChange={ (e) => setSearchModel(e.target.value) }
          placeholder='Tiguan'
          className='searchbar__input'
        />
        <SearchButton otherClasses={ `sm:hidden` } />
      </div>
      <SearchButton otherClasses={ `max-sm:hidden` } />
    </form>
  )
};

export default SearchBar
