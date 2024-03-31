import { Paragraph } from "@/components/_ui/Paragraph";
import { Form } from "./components/Form";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <section className="m-10 flex max-w-screen-lg flex-1 gap-[4.5rem] max-lg:m-1 max-lg:flex-col-reverse max-lg:gap-0">
        <div className="flex-[1.3] max-lg:m-10">
          <h1 className="text-h1 font-medium text-graphite">
            Como utilizar a calculadora de férias
          </h1>

          <Paragraph>
            Para ficar tranquilo no seu descanso e com dinheiro no bolso, veja
            como fazer o cálculo de férias:
          </Paragraph>

          <br />

          <ol className="list-inside list-decimal text-graphite">
            <li>Preencha o valor do seu salário bruto;</li>
            <li>Preencha o valor médio da sua hora extra (Opcional);</li>
            <li>Informe o número de dependentes, caso tenha;</li>
            <li>Preencha a quantidade de dias de férias requisitados;</li>
            <li>Informe se vai ter abono pecuniário de 1/3;</li>
            <li>Marque se irá adiantar a 1ª parcela do 13º salário.</li>
          </ol>

          <Paragraph>
            É previsto por lei que um funcionário CLT pode tirar férias após
            trabalhar um período de 12 meses (1 ano). Porém, é possível que
            dúvidas existam em relação ao cálculo de férias remuneradas. <br />
            Dessa forma, confira um exemplo de como ele é realizado no caso de
            um trabalhador que recebe um salário de R$2400/mês.
          </Paragraph>
        </div>

        <div className="h-fit flex-1 rounded bg-white p-[2.875rem] pb-8 max-lg:p-9">
          <h2 className="text-h2 font-semibold">
            Calculadora de Férias Online
          </h2>

          <Form />
        </div>
      </section>
    </main>
  );
}
