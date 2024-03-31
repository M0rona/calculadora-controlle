export const ItemsCalc = ({ params }: { params: URLSearchParams }) => {
  return (
    <>
      <span>
        Salário bruto:{" "}
        <strong>
          R$ {params.get("salarioBruto") ? params.get("salarioBruto") : "0,00"}
        </strong>
      </span>

      <span>
        Média de hora extra:{" "}
        <strong>
          R$ {params.get("horaExtra") ? params.get("horaExtra") : "0,00"}
        </strong>
      </span>

      <span>
        Dependetes:{" "}
        <strong>
          {params.get("dependentes") ? params.get("dependentes") : "0"}
        </strong>
      </span>

      <span>
        Dias de férias:{" "}
        <strong>
          {params.get("diasFerias") ? params.get("diasFerias") : "0"}
        </strong>
      </span>

      <span>
        Abono pecuniário:{" "}
        <strong>
          {parseInt(params.get("abonoPecuniario") as string) ? "Sim" : "Não"}
        </strong>
      </span>

      <span>
        Adiantar 1ª parcela 13º:{" "}
        <strong>
          {parseInt(params.get("adiantarParcela") as string) ? "Sim" : "Não"}
        </strong>
      </span>
    </>
  );
};
