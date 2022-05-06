import { useFormContext, useWatch } from 'react-hook-form';

interface TextFormProps {
  id: string;
  type: string;
  label: string;
  pattern?: string;
  inputMode?:
    | 'search'
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
  errorMessage?: string;
}

export function TextForm({
  id,
  type,
  label,
  pattern,
  inputMode,
  errorMessage
}: TextFormProps) {
  // ! pattern and validate from react-hook-form are not currently automatically show the error until submit
  // ! so, I use the built-in html pattern attribute to show the error

  const {
    register,
    getValues,
    formState: { errors, dirtyFields, isSubmitted }
  } = useFormContext();

  const [inputValue, labelSplit] = [getValues(id), label.split(' ')];
  let currentPassword =
    id === 'confirmPassword' ? useWatch({ name: 'password' }) : null;

  if (id === 'confirmPassword' && !currentPassword) {
    currentPassword = Math.random();
    errorMessage = 'You must fill the password first.';
  }

  return (
    <div>
      <input
        className={`${dirtyFields[id] && !errors[id] && 'border-green-400'} ${
          errors[id] && 'border-pink-400'
        } peer relative mb-2 h-10 w-full border-b-2 text-gray-900 transition-colors duration-300
          invalid:border-pink-400 focus:border-blue-400 focus:outline-none`}
        id={id}
        type={type}
        pattern={currentPassword || pattern}
        {...register(id, {
          required: `You must ${
            id !== 'confirmPassword'
              ? `provide ${/^[aeiou]/i.test(label) ? 'an' : 'a'} ${
                  labelSplit.length > 1
                    ? labelSplit.map((word) => word.toLowerCase()).join(' ')
                    : label.toLowerCase()
                }`
              : 'confirm your password'
          }.`
        })}
        inputMode={inputMode}
        placeholder=' '
        autoComplete='nope'
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
      <p
        className={`${
          errors[id] && isSubmitted && '!max-h-48 !pb-2 !delay-[0ms]'
        } ${
          !isSubmitted &&
          'peer-placeholder-shown:max-h-0 peer-placeholder-shown:pb-0'
        } max-h-0 overflow-hidden italic text-pink-400 transition-all delay-1000 duration-300
          peer-valid:delay-[0ms] peer-focus:peer-invalid:max-h-48 peer-focus:peer-invalid:pb-2`}
      >
        {inputValue || isSubmitted
          ? errors[id]?.message || errorMessage
          : errorMessage}
      </p>
    </div>
  );
}
