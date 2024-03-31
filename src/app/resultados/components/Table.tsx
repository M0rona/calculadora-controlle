import { calculation } from "../utils/calculation";

export const Table = ({ params }: { params: URLSearchParams }) => {
  const classThead = "font-normal p-5 text-left";
  const classItems = "p-5 max-md:min-w-36";
  const classBorder = "border-b-1 border-b-lines";

  const result = calculation(Object.fromEntries(params));

  return (
    <table className="w-full">
      <thead className={classBorder}>
        <tr className={classBorder}>
          <th className={classThead}>Evento</th>
          <th className={classThead}>Ref.</th>
          <th className={classThead}>Proventos</th>
          <th className={classThead}>Descontos</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classBorder}>
          <td className={classItems}>Valor férias</td>
          <td className={classItems}>-</td>
          <td className={classItems}>R$ {result.vacation}</td>
          <td className={classItems}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>1/3 férias</td>
          <td className={classItems}>-</td>
          <td className={classItems}>R$ {result.thirdHolidays}</td>
          <td className={classItems}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>Abono pecuniário</td>
          <td className={classItems}>-</td>
          <td className={classItems}>
            {parseInt(params.get("abonoPecuniario") as string)
              ? `R$ ${result.monetaryAllowance}`
              : ""}
          </td>
          <td className={classItems}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>1/3 abono pecuniário</td>
          <td className={classItems}>-</td>
          <td className={classItems}>
            {parseInt(params.get("abonoPecuniario") as string)
              ? `R$ ${result.thirdAllowance}`
              : ""}
          </td>
          <td className={classItems}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>Adiantamento 1 parcela 13</td>
          <td className={classItems}>-</td>
          <td className={classItems}>
            {parseInt(params.get("adiantarParcela") as string)
              ? `R$ ${result.advance13}`
              : ""}
          </td>
          <td className={classItems}>-</td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>INSS</td>
          <td className={classItems}></td>
          <td className={classItems}></td>
          <td className={classItems}></td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>IRRF</td>
          <td className={classItems}></td>
          <td className={classItems}></td>
          <td className={classItems}></td>
        </tr>
        <tr className={classBorder}>
          <td className={classItems}>Totais</td>
          <td className={classItems}></td>
          <td className={classItems}>R$ {result.total}</td>
          <td className={classItems}></td>
        </tr>
        <tr>
          <td colSpan={4}>
            <div className="flex w-full">
              <div className={`${classItems} flex-1`}>
                Valor líquido de férias
              </div>
              <div className={`${classItems} flex-1 bg-[#FEFFCF] text-center`}>
                R$ 0,00
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
