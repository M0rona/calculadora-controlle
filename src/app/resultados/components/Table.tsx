import { calculation } from "../utils/calculation";

export const Table = ({ params }: { params: URLSearchParams }) => {
  const classThead = "font-normal p-5";
  const classItems = "p-5 max-md:min-w-36";
  const classItemsCenter = classItems + " text-center";
  const classBorder = "border-b-1 border-b-lines";

  const result = calculation(Object.fromEntries(params));

  return (
    <table className="w-full">
      <thead className={classBorder}>
        <tr className={classBorder}>
          <th className={`${classThead} text-left`}>Evento</th>
          <th className={`${classThead} text-center`}>Ref.</th>
          <th className={`${classThead} text-center`}>Proventos</th>
          <th className={`${classThead} text-center`}>Descontos</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classBorder}>
          <td className={classItems}>Valor férias</td>
          <td className={classItemsCenter}>-</td>
          <td className={classItemsCenter}>R$ {result.vacation}</td>
          <td className={classItemsCenter}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>1/3 férias</td>
          <td className={classItemsCenter}>-</td>
          <td className={classItemsCenter}>R$ {result.thirdHolidays}</td>
          <td className={classItemsCenter}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>Abono pecuniário</td>
          <td className={classItemsCenter}>-</td>
          <td className={classItemsCenter}>
            {parseInt(params.get("abonoPecuniario") as string)
              ? `R$ ${result.monetaryAllowance}`
              : ""}
          </td>
          <td className={classItemsCenter}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>1/3 abono pecuniário</td>
          <td className={classItemsCenter}>-</td>
          <td className={classItemsCenter}>
            {parseInt(params.get("abonoPecuniario") as string)
              ? `R$ ${result.thirdAllowance}`
              : ""}
          </td>
          <td className={classItemsCenter}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>Adiantamento 1 parcela 13</td>
          <td className={classItemsCenter}>-</td>
          <td className={classItemsCenter}>
            {parseInt(params.get("adiantarParcela") as string)
              ? `R$ ${result.advance13}`
              : ""}
          </td>
          <td className={classItemsCenter}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>INSS</td>
          <td className={classItemsCenter}>{result.inss.rate}</td>
          <td className={classItemsCenter}></td>
          <td className={classItemsCenter}>R$ {result.inss.value}</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>IRRF</td>
          <td className={classItemsCenter}>{result.irrf.rate}</td>
          <td className={classItemsCenter}></td>
          <td className={classItemsCenter}>R$ {result.irrf.value}</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>Totais</td>
          <td className={classItemsCenter}></td>
          <td className={classItemsCenter}>R$ {result.total}</td>
          <td className={classItemsCenter}>R$ {result.fullDiscounts}</td>
        </tr>
        <tr>
          <td colSpan={4}>
            <div className="flex w-full">
              <div className={`${classItems} flex-1`}>
                Valor líquido de férias
              </div>
              <div className={`${classItems} flex-1 bg-[#FEFFCF] text-center`}>
                R$ {result.netValue}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
