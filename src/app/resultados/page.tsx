"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ItemsCalc } from "./components/ItemsCalc";
import { Table } from "./components/Table";

export default function Resultados() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}

function MainContent() {
  const params = useSearchParams();

  return (
    <main className="a flex flex-1 flex-col items-center p-10 max-md:p-5">
      <section className="flex w-full max-w-screen-lg flex-col gap-5">
        <h1 className="text-h1-medium font-medium">Cálculo</h1>

        <div className="grid grid-cols-2 gap-2 rounded bg-white p-8 max-md:grid-cols-1">
          <ItemsCalc params={params} />
        </div>
      </section>

      <section className="mt-8 flex w-full max-w-screen-lg flex-col gap-5">
        <h1 className="text-h1-medium font-medium">Resultado</h1>

        <div className="rounded bg-white max-md:overflow-x-auto">
          <Table params={params} />
        </div>
      </section>
    </main>
  );
}
