export const calculation = (data: { [k: string]: string }) => {
    const grossSalary = data.salarioBruto ? realToNumber(data.salarioBruto) : 0;
    const extraHour = data.horaExtra ? data.horaExtra : "0";
    const vacationDays = data.diasFerias ? data.diasFerias : "0";  
    const allowance = data.abonoPecuniario ? data.abonoPecuniario : "0";
    const parcel = data.adiantarParcela ? data.adiantarParcela : "0";  

    const baseSalary = grossSalary + realToNumber(extraHour);
    const vacation = (baseSalary / 30) * parseInt(vacationDays);
    const thirdHolidays = vacation / 3;
    const monetaryAllowance = parseInt(allowance) ? (baseSalary / 30) * 10 : 0;
    const thirdAllowance = monetaryAllowance / 3;
    const advance13 = parseInt(parcel) ? grossSalary / 2 : 0;
    const total = vacation + thirdHolidays + monetaryAllowance + thirdAllowance + advance13

    return {
        vacation: numberToReal(vacation),
        thirdHolidays: numberToReal(thirdHolidays),
        monetaryAllowance: numberToReal(monetaryAllowance),
        thirdAllowance: numberToReal(thirdAllowance),
        advance13: numberToReal(advance13),
        total: numberToReal(total)
    }
    
}

const realToNumber = (value: string) => {
    return parseFloat(value.replace(/[\.,]/g, ""))/100;
}

const numberToReal = (value: number) => {
    if(!value) return "0,00"

    return parseFloat(value.toFixed(2)).toLocaleString('pt-BR');
}