export function Footer() {
  return (
    <footer className='absolute bottom-0 mb-4 text-lg sm:mb-6'>
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
