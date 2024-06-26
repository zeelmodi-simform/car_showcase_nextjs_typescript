'use client'

import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

const CustomFilters = ({ title, options, isClient = false, setFilter }: CustomFilterProps) => {
  
  const router = useRouter()

  const [selected, setSelected] = useState(options[0])

  const handleUpdateParams = (e: {title: string,value: string}) => {
    
    const newPathname = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathname);
  };

  return (
    <div className='w-fit '>
      <Listbox value={ selected } onChange={ (e) => {
        setSelected(e)
        if (isClient) {          
          setFilter(e.value)
        }
        else {
          handleUpdateParams(e);
        }
      } }>
        <div className='relative w-fit z-10'>
          <Listbox.Button className={ `custom-filter__btn` }>
            <span className='block truncate'>
              { selected.title }
            </span>
            <Image src="/chevron-up-down.svg" alt="up-arrow" width={ 20 } height={ 20 } className='ml-4 object-contain' />
          </Listbox.Button>
          <Transition as={ Fragment } leave="transition ease-in duration-100" leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className="custom-filter__options">
              { options.map((option) => (
                <Listbox.Option key={ option.title } value={ option }
                  className={ ({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}` }>
                  { ({ selected }) => (
                    <div className={ `custom-filter__option truncate ${selected ? 'custom-filter__option--selected font-medium' : 'font-normal'}` }>
                      { option.title }
                    </div>
                    // <span>
                    //   {option.title}
                    // </span>
                  ) }
                </Listbox.Option>
              )) }
            </Listbox.Options>

            
          </Transition>
        </div>
      </Listbox>
    </div>
  )
};

export default CustomFilters
