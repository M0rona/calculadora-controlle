import { InputHTMLAttributes } from "react";

export const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="border-lines mt-1 h-10 w-full rounded border px-3 outline-none placeholder:text-black focus:border-primary-blue"
      {...props}
    />
  );
};
