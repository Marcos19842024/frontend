import upercase from "./Upercase";
import onlyNumbers from "./OnlyNumbers";

export const DataElement = (lista) => {
    const response = [];

    const listarClientes = async () => {
        const data = [];
        let LastClient;
        let LastPet;

        for(let i = 1; i < lista.length; i++) {
            let currentCliente = upercase(lista[i][0]);
            let currentTelefono = await onlyNumbers(lista[i][1]);
            let currentMascota = upercase(lista[i][2]);
            let currentTipo = upercase(lista[i][3]);
            let currentProducto = upercase(lista[i][4]);
            let currentFecha = upercase(lista[i][5]);

            if (LastClient !== currentCliente) {
                let recordatorio = {
                    "Tipo": currentTipo,
                    "Nombre": currentProducto,
                    "Fecha": currentFecha
                };
    
                let mascota = {
                    "Nombre": currentMascota,
                    "Recordatorios": [recordatorio]
                };
    
                let cliente = {
                    "Nombre": currentCliente,
                    "Telefono": currentTelefono,
                    "Mascotas": [mascota],
                };
                
                data.push(cliente)
            }
            else {
                if (LastPet !== currentMascota) {
                    let recordatorio = {
                        "Tipo": currentTipo,
                        "Nombre": currentProducto,
                        "Fecha": currentFecha
                    };
    
                    let mascota = {
                        "Nombre": currentMascota,
                        "Recordatorios": [recordatorio]
                    };

                    data[data.length - 1].Mascotas.push(mascota)
                }
                else {
                    let recordatorio = {
                        "Tipo": currentTipo,
                        "Nombre": currentProducto,
                        "Fecha": currentFecha
                    };

                    data[data.length - 1].Mascotas[data[data.length - 1].Mascotas.length -1].Recordatorios.push(recordatorio)
                }
            }
            
            LastClient = currentCliente;
            LastPet = currentMascota;
        }

        ListPets(data);
    }

    const ListPets = (clientes) => {
        let id = 0;

        clientes.forEach(cliente => {
            const Pets = cliente.Mascotas;
            const nombre = cliente.Nombre;
            const telefono = cliente.Telefono;
            let Mascotas = "";
            let Mensaje = "";
        
            if (Pets.length === 1) {
                Mascotas += Pets[0].Nombre;
                Mensaje = "su mascota '" + Pets[0].Nombre + "'," + ListReminders(Pets[0]);
            }
            else {
                Mensaje = "sus mascotas: '";
            
                for (let i = 0; i < Pets.length; i++) {
                    if (i === 0) {
                        Mascotas = Pets[i].Nombre;
                        Mensaje += Pets[i].Nombre + "'," + ListReminders(Pets[i]);
                    }
                    else {
                        if (i === (Pets.length - 1)) {
                            Mascotas += " y " + Pets[i].Nombre + ".";
                            Mensaje += " y '" + Pets[i].Nombre + "'," + ListReminders(Pets[i]);
                        }
                        else {
                            Mascotas += ", " + Pets[i].Nombre;
                            Mensaje += ", '" + Pets[i].Nombre + "'," + ListReminders(Pets[i]);
                        }
                    }
                }

                Mensaje += " el día " + Pets[0].Recordatorios[0].Fecha + ".";
            }

            let dato = {
                "key":id,
                "Nombre": nombre,
                "Telefono": telefono,
                "Mascotas": Mascotas,
                "Mensaje": Mensaje                
            }

            id ++;
            response.push(dato);
        });
    }
    
    const ListReminders = (Pet) => {
        let Reminder = " tiene pendiente la aplicación de ";
        let Reminders = Pet.Recordatorios;
    
        if (Reminders.length === 1) {
            Reminder += Reminders[0].Tipo + " (" + Reminders[0].Nombre + ")";
        }
        else {
            for (let i = 0; i < Reminders.length; i++) {
                if (i === 0) {
                    Reminder += Reminders[i].Tipo + " (" + Reminders[i].Nombre + ")";
                }
                else {
                    if (i === (Reminders.length - 1)) {
                        Reminder += " y " + Reminders[i].Tipo + " (" + Reminders[i].Nombre + ")";
                    }
                    else {
                        Reminder += ", " + Reminders[i].Tipo + " (" + Reminders[i].Nombre + ")";
                    }
                }
            }
        }

        return Reminder;
    }

    listarClientes();

    return response;
}