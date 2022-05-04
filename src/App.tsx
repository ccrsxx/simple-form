import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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

  const { register, getValues } = useForm();

  return (
    <div className='min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
      <header className='p-4 text-center'>
        <h1 className='text-4xl font-bold'>Simple Form</h1>
        <h2 className='mt-2 text-xl font-light italic opacity-80'>
          Thank you for taking the time to complete my form
        </h2>
      </header>
      <main className='mx-auto max-w-xl rounded bg-white px-4 py-6 text-black'>
        <form
          className='flex flex-col gap-6 children:relative children:flex 
                     children:flex-col children:gap-2'
          autoComplete='false'
        >
          <div>
            <input
              className='peer h-10 w-full border-b-2 text-gray-900 
                       focus:border-rose-600 focus:outline-none'
              type='text'
              id='name'
              placeholder=' '
            />
            <label
              className='absolute left-0 -top-3.5 text-sm text-gray-600
                         transition-all
                         peer-placeholder-shown:top-2
                         peer-placeholder-shown:text-base
                       peer-placeholder-shown:text-gray-400
                         peer-focus:-top-3.5 peer-focus:text-sm
                       peer-focus:text-gray-600'
              htmlFor='name'
            >
              Name
            </label>
          </div>
          <div>
            <input
              className='peer h-10 w-full border-b-2 text-gray-900 
                       focus:border-rose-600 focus:outline-none'
              type='password'
              id='password'
              placeholder=' '
            />
            <label
              className='absolute left-0 -top-3.5 text-sm text-gray-600
                         transition-all
                         peer-placeholder-shown:top-2
                         peer-placeholder-shown:text-base
                       peer-placeholder-shown:text-gray-400
                         peer-focus:-top-3.5 peer-focus:text-sm
                       peer-focus:text-gray-600'
              htmlFor='password'
            >
              Password
            </label>
          </div>
        </form>
      </main>
    </div>
  );
}
