"use client";

import { FormEvent } from "react";

import { Label } from "@/components/_ui/Label";
import { Input } from "@/components/fields/Input";
import { Select } from "@/components/fields/Select";
import { InputReal } from "@/components/fields/InputReal";
import { Button } from "@/components/_ui/Button";
import { useRouter } from "next/navigation";

export const Form = () => {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    router.push(
      `/resultados?${new URLSearchParams(data as { [k: string]: string })}`,
    );
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-6 grid grid-cols-2 gap-5">
        <Label htmlFor="salarioBruto">
          <span>Salário bruto</span>
          <InputReal name="salarioBruto" required />
        </Label>

        <Label htmlFor="horaExtra">
          <span>Média de hora extra</span>
          <InputReal name="horaExtra" />
        </Label>

        <Label htmlFor="dependentes">
          <span>Dependetes</span>
          <Input
            name="dependentes"
            type="number"
            placeholder="0"
            inputMode="numeric"
            min={0}
            required
          />
        </Label>

        <Label htmlFor="diasFerias">
          <span>Dias de férias</span>
          <Input
            name="diasFerias"
            type="number"
            placeholder="0"
            inputMode="numeric"
            min={0}
            max={30}
            required
          />
        </Label>

        <Label htmlFor="abonoPecuniario">
          <span>Abono pecuniário 1/3</span>
          <Select name="abonoPecuniario">
            <option value="0">Não</option>
            <option value="1">Sim</option>
          </Select>
        </Label>

        <Label htmlFor="adiantarParcela">
          <span>Adiantar 13 parcela?</span>
          <Select name="adiantarParcela">
            <option value="0">Não</option>
            <option value="1">Sim</option>
          </Select>
        </Label>
      </div>
      <Button text="Calcular" type="submit" full />
      <Button className="mt-2" text="Limpar" type="reset" full secondary />
    </form>
  );
};
