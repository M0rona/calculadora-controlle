import { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className="flex flex-col justify-end" {...props}>
      {children}
    </label>
  );
};
