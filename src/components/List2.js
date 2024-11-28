import upercase from "./Upercase";
import onlyNumbers from "./OnlyNumbers";

export const List2 = (lista) => {
    const response = [];
    let error;

    const EvaluarContent = () => {
        const titles = ["CLIENTE","TELÉFONO1"];

        if (lista[0][0] !== titles[0] ||
            lista[0][1] !== titles[1]) {
            error = `Error: La hoja de Excel no contiene la información requerida. (${titles})`;
        } else if (lista.length <= 1) {
            error = `Error: La hoja de Excel no contiene información`;
        } else {
            listarClientes();
        }
    }

    const listarClientes = () => {
        let LastClient;
        let id = 0;
        try {
            for(let i = 1; i < lista.length; i++) {
                let currentCliente = upercase(lista[i][0]);
                let currentTelefono = onlyNumbers(lista[i][1]);

                if (LastClient !== currentCliente) {
                    let cliente = {
                        "key":id,
                        "Nombre": currentCliente,
                        "Telefono": currentTelefono
                    };
                    response.push(cliente)
                }
                LastClient = currentCliente;
                id ++;
            }
        } catch (err) {
            error = `Error: ${err}, ¡No se cargaron los datos de la hoja de Excel!`;
        }
    }

    EvaluarContent();

    return [error, response];
}