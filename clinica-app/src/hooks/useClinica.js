import { useState, useEffect } from 'react';
import { pacientesIniciales, medicos, comite, historialInicial } from '../data/datos';

class NodoSimple {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaSimple {
    constructor() {
        this.cabeza = null;
        this.longitud = 0;
    }

    agregar(dato) {
        const nuevo = new NodoSimple(dato);
        if (!this.cabeza) {
            this.cabeza = nuevo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevo;
        }
        this.longitud++;
    }

    eliminar(id) {
        if (!this.cabeza) return null;
        
        if (this.cabeza.dato.id === id) {
            const eliminado = this.cabeza.dato;
            this.cabeza = this.cabeza.siguiente;
            this.longitud--;
            return eliminado;
        }

        let actual = this.cabeza;
        while (actual.siguiente && actual.siguiente.dato.id !== id) {
            actual = actual.siguiente;
        }

        if (actual.siguiente) {
            const eliminado = actual.siguiente.dato;
            actual.siguiente = actual.siguiente.siguiente;
            this.longitud--;
            return eliminado;
        }
        return null;
    }

    obtenerTodos() {
        const elementos = [];
        let actual = this.cabeza;
        while (actual) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }

    obtenerPorId(id) {
        let actual = this.cabeza;
        while (actual) {
            if (actual.dato.id === id) return actual.dato;
            actual = actual.siguiente;
        }
        return null;
    }
}


class NodoDoble {
    constructor(dato) {
        this.dato = dato;
        this.anterior = null;
        this.siguiente = null;
    }
}

class ListaDoble {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.longitud = 0;
    }

    agregar(dato) {
        const nuevo = new NodoDoble(dato);
        if (!this.cabeza) {
            this.cabeza = nuevo;
            this.cola = nuevo;
        } else {
            this.cola.siguiente = nuevo;
            nuevo.anterior = this.cola;
            this.cola = nuevo;
        }
        this.longitud++;
    }

    obtenerTodos() {
        const elementos = [];
        let actual = this.cabeza;
        while (actual) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }

    obtenerUltimos(cantidad = 5) {
        const elementos = [];
        let actual = this.cola;
        let contador = 0;
        while (actual && contador < cantidad) {
            elementos.push(actual.dato);
            actual = actual.anterior;
            contador++;
        }
        return elementos;
    }
}

class NodoCircular {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaCircular {
    constructor() {
        this.actual = null;
        this.longitud = 0;
    }

    agregar(dato) {
        const nuevo = new NodoCircular(dato);
        if (!this.actual) {
            this.actual = nuevo;
            nuevo.siguiente = nuevo;
        } else {
            let temp = this.actual;
            while (temp.siguiente !== this.actual) {
                temp = temp.siguiente;
            }
            temp.siguiente = nuevo;
            nuevo.siguiente = this.actual;
        }
        this.longitud++;
    }

    rotar() {
        if (this.actual) {
            this.actual = this.actual.siguiente;
            return this.actual.dato;
        }
        return null;
    }

    obtenerActual() {
        return this.actual ? this.actual.dato : null;
    }

    obtenerTodos() {
        if (!this.actual) return [];
        const elementos = [];
        let temp = this.actual;
        do {
            elementos.push(temp.dato);
            temp = temp.siguiente;
        } while (temp !== this.actual);
        return elementos;
    }
}

class NodoCircularDoble {
    constructor(dato) {
        this.dato = dato;
        this.anterior = null;
        this.siguiente = null;
    }
}

class ListaCircularDoble {
    constructor() {
        this.actual = null;
        this.longitud = 0;
    }

    agregar(dato) {
        const nuevo = new NodoCircularDoble(dato);
        if (!this.actual) {
            this.actual = nuevo;
            nuevo.siguiente = nuevo;
            nuevo.anterior = nuevo;
        } else {
            const ultimo = this.actual.anterior;
            ultimo.siguiente = nuevo;
            nuevo.anterior = ultimo;
            nuevo.siguiente = this.actual;
            this.actual.anterior = nuevo;
        }
        this.longitud++;
    }

    rotarSiguiente() {
        if (this.actual) {
            this.actual = this.actual.siguiente;
            return this.actual.dato;
        }
        return null;
    }

    rotarAnterior() {
        if (this.actual) {
            this.actual = this.actual.anterior;
            return this.actual.dato;
        }
        return null;
    }

    obtenerActual() {
        return this.actual ? this.actual.dato : null;
    }

    obtenerTodos() {
        if (!this.actual) return [];
        const elementos = [];
        let temp = this.actual;
        do {
            elementos.push(temp.dato);
            temp = temp.siguiente;
        } while (temp !== this.actual);
        return elementos;
    }
}

export function useClinica() {
    // Estado de las listas
    const [listaEspera] = useState(() => {
        const lista = new ListaSimple();
        pacientesIniciales.forEach(p => lista.agregar(p));
        return lista;
    });

    const [historial] = useState(() => {
        const lista = new ListaDoble();
        historialInicial.forEach(h => lista.agregar(h));
        return lista;
    });

    const [medicosLista] = useState(() => {
        const lista = new ListaCircular();
        medicos.forEach(m => lista.agregar(m));
        return lista;
    });

    const [comiteLista] = useState(() => {
        const lista = new ListaCircularDoble();
        comite.forEach(c => lista.agregar(c));
        return lista;
    });

    const [medicoActual, setMedicoActual] = useState(medicosLista.obtenerActual());
    const [turnosAtendidos, setTurnosAtendidos] = useState(0);

    // Atender paciente
    const atenderPaciente = (id) => {
        const paciente = listaEspera.obtenerPorId(id);
        if (!paciente) return;

        // Eliminar de espera
        const atendido = listaEspera.eliminar(id);
        
        // Agregar al historial
        const nuevoRegistro = {
            id: Date.now(),
            paciente: atendido.nombre,
            medico: medicoActual?.nombre || "Sin médico",
            fecha: new Date().toLocaleString()
        };
        historial.agregar(nuevoRegistro);

        setTurnosAtendidos(prev => prev + 1);
        
        // Rotar médico automáticamente
        const nuevoMedico = medicosLista.rotar();
        setMedicoActual(nuevoMedico);
    };

    // Agregar paciente
    const agregarPaciente = (nombre, edad, sintoma) => {
        const nuevoPaciente = {
            id: Date.now(),
            nombre,
            edad: parseInt(edad),
            sintoma
        };
        listaEspera.agregar(nuevoPaciente);
    };

    // Rotar comité
    const rotarComiteSiguiente = () => {
        return comiteLista.rotarSiguiente();
    };

    const rotarComiteAnterior = () => {
        return comiteLista.rotarAnterior();
    };

    // Rotación automática de médicos
    useEffect(() => {
        const interval = setInterval(() => {
            const nuevoMedico = medicosLista.rotar();
            setMedicoActual(nuevoMedico);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return {
        listaEspera,
        historial,
        medicosLista,
        comiteLista,
        medicoActual,
        turnosAtendidos,
        atenderPaciente,
        agregarPaciente,
        rotarComiteSiguiente,
        rotarComiteAnterior,
    };
}