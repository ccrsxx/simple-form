export function Footer() {
  return (
    <footer className='mb-6 mt-2 flex flex-1 items-end text-lg'>
      <p>
        Made with{' '}
        <span role='img' aria-label='heart'>
          ❤️
        </span>
        with{' '}
        <a
          className='decoration-transparent underline-offset-2 transition-all 
                     hover:underline hover:decoration-pink-200'
          href='https://github.com/ccrsxx'
        >
          ccrsxx
        </a>
      </p>
    </footer>
  );
}
