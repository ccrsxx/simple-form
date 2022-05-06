import { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Header,
  Container,
  TextForm,
  CountryForm,
  Submit,
  Footer
} from './components';
import { DefaultData, countries, defaultData } from './common';

export function App() {
  const [query, setQuery] = useState('');

  const methods = useForm({
    mode: 'onChange',
    defaultValues: defaultData
  });

  useEffect(() => {
    const randomizeGradient = () => {
      const ogColors = ['#ee7752', '#e73c7e', '#23a6d5', '#23d5ab'];

      const shuffledColors = ogColors
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      shuffledColors.forEach((color, index) =>
        document.documentElement.style.setProperty(`--color-${index}`, color)
      );
    };
    randomizeGradient();
  }, []);

  const onSubmit = (data: DefaultData) => {
    const { confirmPassword, ...rest } = {
      ...data
    };
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(rest));
  };

  const filteredCountries = useMemo(
    () =>
      query === ''
        ? countries
        : countries.filter((country) =>
            country.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          ),
    [query]
  );

  return (
    <div
      className='relative flex min-h-screen flex-col items-center gap-2
                 bg-gradient-to-r from-cyan-500 to-blue-500 sm:gap-4'
    >
      <Header />
      <FormProvider {...methods}>
        <Container onSubmit={onSubmit}>
          <TextForm
            id='email'
            type='email'
            label='Email'
            errorMessage='Must be a valid email address.'
          />
          <CountryForm
            query={query}
            filteredCountries={filteredCountries}
            setQuery={setQuery}
          />
          <TextForm
            id='zipCode'
            type='text'
            label='Zip Code'
            inputMode='numeric'
            pattern='^\d{5}$'
            errorMessage='Must be 5 length number.'
          />
          <TextForm
            id='password'
            type='password'
            label='Password'
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
            errorMessage='Must contain at least one number, one uppercase and one lowercase letter, and at least 6 characters.'
          />
          <TextForm
            id='confirmPassword'
            type='password'
            label='Confirm Password'
            errorMessage='Must match with password.'
          />
          <Submit />
        </Container>
        <Footer />
      </FormProvider>
    </div>
  );
}
