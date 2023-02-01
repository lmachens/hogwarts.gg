import { forwardRef } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    error?: React.ReactNode;
    description?: string;
    options: { value: string; title: string }[];
  } & Partial<ReturnType<UseFormRegister<any>>>
>(({ options, className, label, description, error, ...props }, ref) => (
  <>
    <Label
      label={label}
      description={description}
      required={props.required}
      className={className}
    >
      <select
        className={
          'bg-gray-900 w-full rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors'
        }
        {...props}
        ref={ref}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </Label>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </>
));
Select.displayName = 'Select';

export default Select;
