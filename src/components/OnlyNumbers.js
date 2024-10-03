function onlyNumbers (str) {
    const numbers = str.replace(/[^0-9]+/g, "");
    return numbers;
};

export default onlyNumbers;