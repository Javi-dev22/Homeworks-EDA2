export class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

export class ArbolBinario {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {
    const nuevoNodo = new Nodo(valor);
    if (this.raiz === null) {
      this.raiz = nuevoNodo;
    } else {
      this._insertarNodo(this.raiz, nuevoNodo);
    }
  }

  _insertarNodo(nodo, nuevoNodo) {
    if (nuevoNodo.valor < nodo.valor) {
      if (nodo.izquierda === null) {
        nodo.izquierda = nuevoNodo;
      } else {
        this._insertarNodo(nodo.izquierda, nuevoNodo);
      }
    } else {
      if (nodo.derecha === null) {
        nodo.derecha = nuevoNodo;
      } else {
        this._insertarNodo(nodo.derecha, nuevoNodo);
      }
    }
  }

  inorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      this.inorden(nodo.izquierda, resultado);
      resultado.push(nodo.valor);
      this.inorden(nodo.derecha, resultado);
    }
    return resultado;
  }

  preorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      resultado.push(nodo.valor);
      this.preorden(nodo.izquierda, resultado);
      this.preorden(nodo.derecha, resultado);
    }
    return resultado;
  }

  postorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      this.postorden(nodo.izquierda, resultado);
      this.postorden(nodo.derecha, resultado);
      resultado.push(nodo.valor);
    }
    return resultado;
  }

  buscar(valor, nodo = this.raiz) {
    if (nodo === null) return false;
    if (valor === nodo.valor) return true;

    if (valor < nodo.valor) {
      return this.buscar(valor, nodo.izquierda);
    } else {
      return this.buscar(valor, nodo.derecha);
    }
  }

  obtenerDatosD3(nodo = this.raiz) {
    if (nodo === null) return null;
    
    const datos = { name: String(nodo.valor) };
    const hijos = [];
    
    if (nodo.izquierda) hijos.push(this.obtenerDatosD3(nodo.izquierda));
    if (nodo.derecha) hijos.push(this.obtenerDatosD3(nodo.derecha));
    
    if (hijos.length > 0) datos.children = hijos;
    return datos;
  }
}