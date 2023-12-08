import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    textStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    btnType?: 'button' | 'submit',
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: string;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface FilterProps {
    model: string;
    manufacturer: string;
    fuel: string;
    limit: number;
    year: number;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
    isClient?: boolean;
    setFilter?: (filter?: string | number) => void;
}

export interface OptionProps { 
    title: string;
    value: string;
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
    isClient?: boolean
    setLimit?: (limit: number) => void;
}

// https://dev.to/maissenayed/conditional-react-props-with-typescript-43lg

export interface CarsPageSearchParams {
    manufacturer?: string;
    model?: string
    year?: number;
    fuel?: string;
    limit?: number
}

export interface PageProps {
    params?: { [key: string]: string | undefined },
    // searchParams?: { [key: string]: string | undefined | number }
    searchParams: CarsPageSearchParams;
}

