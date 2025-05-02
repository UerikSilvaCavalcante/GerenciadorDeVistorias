
import { forwardRef } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  width?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`px-3 py-1 bg-zinc-950 rounded-md border-2 focus:shadow-inner border-indigo-600 shadow-indigo-600  w-full ${width}`}
        {...props}
      />
    );
  }
);

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children,width , ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={`bg-zinc-950 rounded-md border-2 focus:shadow-md border-indigo-600  shadow-indigo-700 py-2 w-full ${width}`}
      >
        {children}
      </select>
    );
  }
);
Input.displayName = "Input";
Select.displayName = "Select";

export { Input, Select };
