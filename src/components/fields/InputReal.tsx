"use client";

import { ChangeEventHandler, useState } from "react";
interface InputRealProps {
  name: string;
  required?: boolean;
}

export const InputReal = ({ name, required }: InputRealProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const formatReal: ChangeEventHandler<HTMLInputElement> = (event) => {
    // Remove todos as letras digitadas
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");

    let value = event.currentTarget.value;

    while (value.length < 3) {
      value = "0" + value;
    }
    let reais = value.slice(0, -2);
    let centavos = value.slice(-2);
    event.currentTarget.value = `${parseInt(reais).toLocaleString("pt-br")},${centavos}`;
  };

  return (
    <div
      className={`${isFocused ? "border-primary-blue" : "border-lines"} mt-1  flex h-10 items-center rounded border`}
    >
      <div className="flex h-full min-w-10 items-center justify-center rounded bg-gentleSky">
        <span>R$</span>
      </div>

      <input
        className="mx-3 h-full w-full outline-none placeholder:text-black"
        placeholder="0,00"
        inputMode="numeric"
        name={name}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={formatReal}
      />
    </div>
  );
};
