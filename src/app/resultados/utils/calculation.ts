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

    const baseSalary = grossSalary + realToNumber(extraHour); // Salário base do empregado
    const vacation = (baseSalary / 30) * parseInt(vacationDays); // Valor das férias do empregado
    const thirdHolidays = vacation / 3; // Valor do terço constitucional de férias
    const monetaryAllowance = parseInt(allowance) ? (baseSalary / 30) * 10 : 0; // Valor do abono
    const thirdAllowance = monetaryAllowance / 3; // Valor do terço de abono
    const advance13 = parseInt(parcel) ? grossSalary / 2 : 0; // Valor do adiantamento do 13º salário
    const total = vacation + thirdHolidays + monetaryAllowance + thirdAllowance + advance13; // Total de rendimentos, que é a soma de todos os valores acima
    const discountBasis = vacation + thirdHolidays; // Base de desconto, que é o total de rendimentos menos quaisquer deduções
    const inss = rangeInss(discountBasis); // Desconto do INSS, que é calculado com base na base de desconto
    const irrf = rangeIrrf(discountBasis - inss.value - (parseInt(dependents) * 189.59)); // Desconto do IRRF, que é calculado com base na base de desconto menos o desconto do INSS
    const fullDiscounts = inss.value + irrf.value; // Total de descontos, que é a soma dos descontos do INSS e do IRRF
    const netValue = total - fullDiscounts; // Valor líquido, que é o total de rendimentos menos o total de descontos
    

    // converte os valores para reais
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
// Função para converter um valor em formato de string de real para um número
const realToNumber = (value: string): number => {
    // Remove os pontos e vírgulas da string e divide por 100 para obter o valor em decimal
    return parseFloat(value.replace(/[\.,]/g, ""))/100;
}

// Função para converter um valor numérico para o formato de string de real
const numberToReal = (value: number): string => {
    // Se o valor for 0 ou não definido, retorna "0,00 (previne erros)"
    if(!value) return "0,00"

    // Converte o número para uma string com duas casas decimais, substitui o ponto por uma vírgula
    // e adiciona um ponto a cada três dígitos para representar os milhares
    // OBS: desta forma se o numero for 1.280,80 ele será impresso assim, com o 
    // toLocaleString() ficaria 1.280,8
    return value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const rangeInss = (discountBasis: number): FindRangeProps => {
    // Define as faixas de contribuição do INSS
    const ranges = [
        {min: 0, max: 1412.00, rate: 0.075},
        {min: 1412.01, max: 2666.68, rate: 0.09},
        {min: 2666.69, max: 4000.03, rate: 0.12},
        {min: 4000.04, max: 7786.02, rate: 0.14},
    ];

    // Inicializa a variável que armazenará o total da contribuição
    let totalContribution = 0;
    // Inicializa a variável que armazenará o valor máximo da faixa
    let rangeMax = 0;


    // O loop procura a faixa correta de contribuição com base no valor do desconto, calculando a contribuição para cada faixa
    // A cada iteração, o loop soma a contribuição da faixa atual para a variável "totalContribution"
    // Quando a contribuição base atingir ou ultrapassar o valor máximo da faixa, a variável "rangeMax" é atualizada para o valor máximo da faixa corrente
    // Quando a contribuição base atingir ou ultrapassar o valor máximo da faixa, o loop para de executar e a variável "totalContribution" já contém a contribuição total
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


    // Este loop itera sobre as faixas de IRRF até encontrar a faixa correta
    // Cada iteração verifica se a base de IRRF está dentro da faixa atual
    // Quando a faixa for encontrada, a função retorna a taxa e o valor da IRRF para essa faixa
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