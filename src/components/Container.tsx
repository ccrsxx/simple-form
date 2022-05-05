export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-[90vw] max-w-xl rounded-lg bg-white px-8 py-10 text-black sm:w-full'>
      <form className='flex flex-col gap-6 children:relative'>{children}</form>
    </main>
  );
}
