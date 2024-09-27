'use client'

import React, { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FixedSizeList as List } from 'react-window';

import useDebounce from '@/app/_hooks/useDebounce';

import { LocationLocationOptions } from '@/src/constants/locationLocations';
import { Search as SearchIcon } from "lucide-react"

interface SearchItem {
  name: string;
  [key: string]: any;
}

interface SearchProps<T> {
  items: T[];
  displayField: keyof T;
  setValue: UseFormSetValue<any>;
  setLocationDisplayValue: (item: LocationLocationOptions) => void;
}

/**
 * Search component for Google Search Campaign.
 *
 * @component
 * @param {Object[]} items - The list of items to search from.
 * @param {string} displayField - The field to display in the search results.
 * @returns {JSX.Element} The Search component.
 */
const GoogleLocationsDropdown: React.FC<SearchProps<SearchItem>> = ({ items, displayField, setValue, setLocationDisplayValue }) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setFilteredItems(
        items.filter(item =>
          item[displayField].toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [debouncedQuery, items, displayField]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  const handleItemClick = (item: SearchItem) => {
    setValue('location', item);
    setValue('country', item);
    setLocationDisplayValue(item as LocationLocationOptions);
  };

  const listHeight = Math.min(filteredItems.length * 35, 300);

  return (
    <>
      <div className="flex items-center border-b theme-b-p px-3" >
        <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder='Search loaction...'
          onChange={handleInputChange}
        />
      </div>
      <div className='p-1'>
        <List
          height={listHeight}
          itemCount={filteredItems.length}
          itemSize={35}
          width={408}
        >
          {({ index, style }) => (
            <div
              style={style}
              className='px-2 py-1.5 flex items-center cursor-pointer hover:bg-base-50 hover:dark:bg-theme-night-background-secondary rounded-sm'
              onClick={() => handleItemClick(filteredItems[index])}
            >
              <p className='text-xs font-bold'>{filteredItems[index]['countryCode']}</p>
              <p className='text-sm pl-1'>{filteredItems[index][displayField]}</p>

              <p className='ml-auto'>{filteredItems[index]['targetType']}</p>
            </div>
          )}
        </List>
      </div>
    </>
  );
};

export default GoogleLocationsDropdown;