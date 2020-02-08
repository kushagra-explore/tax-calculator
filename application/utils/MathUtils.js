
export function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export function numberFormatter(number) {
    let wholeNumber = number;
    if(number <= 999){
        return number;
    }
    let power = 0;
    const quotient = 1000;
    const multipliers = [
        {key: "K", value: 1000},
        {key: "M", value: Math.pow(10, 6)},
        {key: "B", value: Math.pow(10, 9)},
        {key: "T", value: Math.pow(10, 12)},
        {key: "Q", value: Math.pow(10, 15)}
    ];
    while(Math.floor(number/quotient) > 0 && power<6){
        number = Math.floor(number/quotient);
        power++;
    }
    let numeral = round(wholeNumber/(multipliers[power-1].value), 1);
    return (numeral + multipliers[power-1].key);
}
