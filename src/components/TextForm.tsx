interface TextFormProps {
  id: string;
  type: string;
  label: string;
}

export function TextForm({ id, type, label }: TextFormProps) {
  return (
    <div>
      <input
        className='peer h-10 w-full border-b-2 text-gray-900 
                 focus:border-rose-600 focus:outline-none'
        type={type}
        id={id}
        placeholder=' '
        autoComplete='off'
      />
      <label
        className='absolute left-0 -top-3.5 text-sm
                 text-gray-600
                   transition-all
                   peer-placeholder-shown:top-2
                   peer-placeholder-shown:cursor-auto
                   peer-placeholder-shown:text-base
                 peer-placeholder-shown:text-gray-400
                   peer-focus:-top-3.5 peer-focus:cursor-default
                   peer-focus:text-sm
                 peer-focus:text-gray-600'
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
