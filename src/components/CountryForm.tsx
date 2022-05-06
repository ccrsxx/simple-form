import { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Country } from '../common';

interface CountryFormProps {
  query: string;
  filteredCountries: Country[];
  setQuery: (value: string) => void;
}

export function CountryForm({
  query,
  filteredCountries,
  setQuery
}: CountryFormProps) {
  return (
    <Controller
      name='country'
      rules={{ required: 'You must select a country.' }}
      render={({
        field: { value, onChange },
        formState: { errors, dirtyFields, isSubmitted }
      }) => (
        <Combobox
          value={value}
          onChange={(data: Country) => onChange(data.name)}
        >
          <div>
            <Combobox.Input
              className={`${
                dirtyFields.country && !errors.country && 'border-green-400'
              } ${
                errors.country && 'border-pink-400'
              } peer mb-2 h-10 w-full border-b-2 text-sm leading-5 text-gray-900
                invalid:border-pink-400 focus:border-blue-400 focus:outline-none`}
              displayValue={value}
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
              Country
            </Combobox.Label>
            <Combobox.Button className='absolute top-2.5 right-0 flex items-center pr-2'>
              <SelectorIcon
                className='h-5 w-5 text-gray-400 transition-all hover:scale-125 hover:brightness-125'
                aria-hidden='true'
              />
            </Combobox.Button>
            <p
              className={`${
                errors.country && isSubmitted && '!max-h-48 !pb-2 !delay-[0ms]'
              } max-h-0 overflow-hidden italic text-pink-400 transition-all delay-1000
                duration-300 peer-focus:peer-invalid:max-h-48 peer-focus:peer-invalid:pb-2`}
            >
              {errors.country?.message}
            </p>
            <Transition
              as={Fragment}
              enter='ease-out duration-150'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-150'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options
                className='absolute top-10 right-0 z-10 mt-1 max-h-60 w-full overflow-auto
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
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
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
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
      )}
    />
  );
}
