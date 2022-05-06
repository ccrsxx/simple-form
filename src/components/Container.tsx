import { useFormContext } from 'react-hook-form';

interface ContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export function Container({ onSubmit, children }: ContainerProps) {
  const { handleSubmit } = useFormContext();

  return (
    <main className='w-[90vw] max-w-xl rounded-lg bg-white px-8 py-9 text-black sm:w-full'>
      <form
        className='flex flex-col gap-4 children:relative'
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </main>
  );
}
