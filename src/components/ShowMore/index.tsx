'use client'

import { ShowMoreProps } from '@/types';
import { useRouter } from 'next/navigation'
import React from 'react'
import { CustomButton } from '..';
import { updateSearchParams } from '@/utils';

const ShowMore = ({ pageNumber, isNext, isClient = false, setLimit }: ShowMoreProps) => {
    
    const router = useRouter();

    const handleNavigation = () => { 
        const newLimit = (pageNumber + 1) * 10
        if (isClient) {
            setLimit(newLimit)
        }
        else {
            const newPathname = updateSearchParams('limit', newLimit.toString());
            router.push(newPathname);
        }
    }

    return (
        <div className='w-full flex-center gap-5 mt-10'>
            { !isNext && <CustomButton
                title='Show More'
                btnType='button'
                containerStyles='bg-primary-blue rounded-full text-white'
                handleClick={ handleNavigation }
            /> }
        </div>
    )
};

export default ShowMore
