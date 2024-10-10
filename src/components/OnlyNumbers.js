function onlyNumbers (str) {
    const numbers = "0123456789";
    let numeros = "";
    for(let i = 0; i < str.length; i++) {
        for(let x = 0; x < numbers.length; x++) {
            if(str.charAt(i) === numbers.charAt(x)){
                numeros += str.charAt(i);
                break;
            }
        }
    }
    return numeros;
};

export default onlyNumbers;