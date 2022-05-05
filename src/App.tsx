import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Header,
  Container,
  TextForm,
  CountryForm,
  Submit,
  Footer
} from './components';

export function App() {
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

  const methods = useForm({
    mode: 'onChange'
  });

  return (
    <div
      className='relative flex min-h-screen flex-col items-center gap-2
                 bg-gradient-to-r from-cyan-500 to-blue-500 sm:gap-4'
    >
      <Header />
      <FormProvider {...methods}>
        <Container>
          <TextForm id='email' type='email' label='Email' />
          <CountryForm />
          <TextForm id='zipCode' type='number' label='Zip Code' />
          <TextForm id='password' type='password' label='Password' />
          <TextForm
            id='confirmPassword'
            type='password'
            label='Confirm Password'
          />
          <Submit />
        </Container>
        <Footer />
      </FormProvider>
    </div>
  );
}
