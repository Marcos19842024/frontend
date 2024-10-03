function upercase (str) {
    let oracion = "";
    oracion = str;
    let palabras = oracion.toLowerCase().split(" ").map((palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    })
    return palabras.join(" ");
};

export default upercase;