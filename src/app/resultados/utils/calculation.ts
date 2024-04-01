interface FindRangeProps {
    rate: number;
    value: number;
}

export const calculation = (data: { [k: string]: string }) => {
    const grossSalary = data.salarioBruto ? realToNumber(data.salarioBruto) : 0;
    const extraHour = data.horaExtra ? data.horaExtra : "0";
    const vacationDays = data.diasFerias ? data.diasFerias : "0";  
    const allowance = data.abonoPecuniario ? data.abonoPecuniario : "0";
    const parcel = data.adiantarParcela ? data.adiantarParcela : "0";  
    const dependents = data.dependentes ? data.dependentes : "0";  

    const baseSalary = grossSalary + realToNumber(extraHour);
    const vacation = (baseSalary / 30) * parseInt(vacationDays);
    const thirdHolidays = vacation / 3;
    const monetaryAllowance = parseInt(allowance) ? (baseSalary / 30) * 10 : 0;
    const thirdAllowance = monetaryAllowance / 3;
    const advance13 = parseInt(parcel) ? grossSalary / 2 : 0;
    const total = vacation + thirdHolidays + monetaryAllowance + thirdAllowance + advance13;
    const discountBasis = vacation + thirdHolidays;
    const inss = rangeInss(discountBasis);
    const irrf = rangeIrrf(discountBasis - inss.value - (parseInt(dependents) * 189.59));
    const fullDiscounts = inss.value + irrf.value;
    const netValue = total - fullDiscounts;
    

    return {
        vacation: numberToReal(vacation),
        thirdHolidays: numberToReal(thirdHolidays),
        monetaryAllowance: numberToReal(monetaryAllowance),
        thirdAllowance: numberToReal(thirdAllowance),
        advance13: numberToReal(advance13),
        total: numberToReal(total),
        inss: {
            rate: `${numberToReal(inss.rate)} %`,
            value: numberToReal(inss.value)
        },
        irrf: {
            rate: `${numberToReal(irrf.rate)} %`,
            value: numberToReal(irrf.value)
        },
        fullDiscounts: numberToReal(fullDiscounts),
        netValue: numberToReal(netValue)
    }
    
}

const realToNumber = (value: string): number => {
    return parseFloat(value.replace(/[\.,]/g, ""))/100;
}

const numberToReal = (value: number): string => {
    if(!value) return "0,00"

    return value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const rangeInss = (discountBasis: number): FindRangeProps => {
    const ranges = [
        {min: 0, max: 1412.00, rate: 0.075},
        {min: 1412.01, max: 2666.68, rate: 0.09},
        {min: 2666.69, max: 4000.03, rate: 0.12},
        {min: 4000.04, max: 7786.02, rate: 0.14},
    ];

    let totalContribution = 0;
    let rangeMax = 0;

    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (discountBasis > range.max) {
            totalContribution += (range.max - rangeMax) * range.rate;
            rangeMax = range.max;
        } else {
            totalContribution += (discountBasis - rangeMax) * range.rate;
            break;
        }
    }

    return {
        rate: totalContribution / discountBasis * 100,
        value: totalContribution
    };
}

const rangeIrrf = (baseIrrf: number): FindRangeProps => {
    const ranges = [
        {min: 0, max: 2259.20, rate: 0, deduction: 0},
        {min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44},
        {min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44},
        {min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77},
        {min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.00},
    ];

    for (let i = 0; i < ranges.length; i++) {
        if (baseIrrf >= ranges[i].min && baseIrrf <= ranges[i].max) {
            return {
                rate: ranges[i].rate * 100,
                value: baseIrrf * ranges[i].rate - ranges[i].deduction
            };
        }
    }

    return {
        rate: 0,
        value: 0
    }
}