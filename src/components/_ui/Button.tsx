import { ButtonHTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    text: string;
  };

const buttonVariants = tv({
  base: "bg-primary-blue text-white px-5 py-3 rounded font-bold transition-colors hover:bg-graphite",
  variants: {
    secondary: {
      true: "bg-transparent text-[#5F5F5F] font-medium hover:bg-gentleSky",
    },
    full: {
      true: "w-full",
    },
  },
});

export const Button = ({
  text,
  className,
  secondary,
  full,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ className, secondary, full })}
      {...props}
    >
      {text}
    </button>
  );
};
