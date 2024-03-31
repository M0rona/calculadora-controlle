"use client";

import { ReactNode, useState } from "react";

interface SelectProps {
  name: string;
  children: ReactNode;
}

export const Select = ({ name, children }: SelectProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      className={`${isFocused ? "border-primary-blue" : "border-lines"} mt-1 h-10 rounded border pr-3`}
    >
      <select
        className="h-full w-full bg-transparent px-3 outline-none placeholder:text-black"
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {children}
      </select>
    </div>
  );
};
