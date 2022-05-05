import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { countries } from '../common';

type Unpacked<T> = T extends (infer U)[] ? U : T;
type Country = Unpacked<typeof countries>;

export function CountryForm() {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');

  const filteredCountries =
    query === ''
      ? countries
      : countries.filter((country) =>
          country.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox value={selected} onChange={setSelected} nullable>
      <div>
        <Combobox.Input
          className='peer h-10 w-full border-b-2 text-sm leading-5
                   text-gray-900 focus:border-rose-600 focus:outline-none 
                     focus:ring-0'
          displayValue={(country: Country) => country?.name}
          onChange={(event) => setQuery(event.target.value)}
          placeholder=' '
        />
        <Combobox.Label
          className='absolute left-0 -top-3.5 cursor-default text-sm
                     text-gray-600 transition-all
                     peer-placeholder-shown:top-2
                     peer-placeholder-shown:cursor-auto
                     peer-placeholder-shown:text-base
                   peer-placeholder-shown:text-gray-400
                     peer-focus:-top-3.5
                     peer-focus:cursor-default peer-focus:text-sm
                   peer-focus:text-gray-600'
        >
          Select Country
        </Combobox.Label>
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
          <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            className='absolute z-10 mt-1 max-h-60 w-full overflow-auto
                       rounded-md bg-white py-1 text-base shadow-lg ring-1
                     ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          >
            {!filteredCountries.length && query !== '' ? (
              <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                Nothing found.
              </div>
            ) : (
              filteredCountries.map((country, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={country}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {country.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
