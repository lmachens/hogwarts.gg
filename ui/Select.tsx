import { forwardRef } from 'react';
import type { UseFormRegister } from 'react-hook-form';

const Select = forwardRef<
  HTMLSelectElement,
  { options: { value: string; title: string }[] } & ReturnType<
    UseFormRegister<any>
  >
>(({ options, ...rest }, ref) => (
  <select {...rest} ref={ref}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.title}
      </option>
    ))}
  </select>
));
Select.displayName = 'Select';

export default Select;
