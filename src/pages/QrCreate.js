import "../styles/QrCreate.css";
import React, { useEffect, useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    type: "png",
    data: "",
    image: "",
    backgroundOptions: {
        color: "#000000",
    },
    dotsOptions: {
        color: "white",
        type: "extra-rounded",
        margin: 10
    },
    cornersSquareOptions: {
        type: "extra-rounded"
    },
    cornersDotOptions: {
        type: "dot"
    },
    imageOptions: {
        margin: 0,
        imageSize: 0.6,
        padding: 25
    }
});

export default function QrCreate() {
    const [colorSeleccionado, setColorSeleccionado] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [texto, setTexto] = useState("");
    const [logo, setLogo] = useState(null);
    const [types, setTypes] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        qrCode.append(ref.current);
    }, []);

    useEffect(() => {
        qrCode.update({
            data: texto,
            image: logo,
            backgroundOptions: {
                color: backgroundColor
            },
            dotsOptions: {
                color: colorSeleccionado,
                type: types,
            },
            cornersSquareOptions: {
                type: types
            },
            cornersDotOptions: {
                type: ( types === "dots") ? "dot" : types
            },
        });
    }, [backgroundColor, colorSeleccionado, logo, texto, types]);

    function getContrastColor(color) {
        //Luminancia = 0.299 * R + 0.587 G + 0.114 * B
        const luminancia = (0.299 * parseInt(color.substr(1, 2), 16) +
        0.587 * parseInt(color.substr(3, 2), 16) +
        0.114 * parseInt(color.substr(5, 2), 16)) /255;
    
        return luminancia > 0.5 ? "#000000" : "#FFFFFF"
    }

    const handleUpload = (file) => {
        if (file) {
            let imagenBlob = new Blob([file[0]],{ type: file[0].type });
            let imagenUrl = URL.createObjectURL(imagenBlob);
            setLogo(imagenUrl);
        }
    }

    return(
        <div className="bodyform">
            <div className="titulo">
                <h3>Generador de Qr</h3>
            </div>
            <input
                type="text"
                className="text-input"
                placeholder="Ingresa el texto para generar el código QR"
                onChange={(e) => {setTexto(e.target.value)}}>
            </input>
            <div className="botones">
                <ul className="qr-personalizado">
                    <li
                        className="basico"
                        onClick={(e) => {setTypes("square")}}>Básico
                    </li>
                    <li
                        className="medio"
                        onClick={(e) => {setTypes("extra-rounded")}}>Medio
                    </li>
                    <li
                        className="avanzado"
                        onClick={(e) => {setTypes("dots")}}>Avanzado
                    </li>
                </ul>
                <ul className="qr-coloryfondo">
                    <label
                        className="color"
                        htmlFor="inputColor">Selecciona el color
                        <input
                            type="color"
                            id="inputColor"
                            className="input-color"
                            hidden
                            onChange={(e) => {
                                setColorSeleccionado(e.target.value);
                                setBackgroundColor(getContrastColor(colorSeleccionado));
                            }}>
                        </input>
                    </label>
                    <label
                        className="fondo"
                        htmlFor="inputLogo">Agrega un logo
                        <input
                            type="file"
                            id="inputLogo"
                            className="input-logo"
                            hidden
                            accept=".jpg, .png, .jpeg, .svg"
                            onChange={(e) => {handleUpload(e.target.files)}}>
                        </input>
                    </label>
                </ul>
            </div>
            <div
                className="qrcode"
                ref={ref}>
            </div>
            {texto ?
                <button
                    className="btn-descargar"
                    onClick={() => {qrCode.download()}}>Descargar Código QR
                </button> : null
            }
        </div>
    );
};