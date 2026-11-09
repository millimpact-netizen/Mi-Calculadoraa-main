
import { useState } from "react";

export interface HistorialItem {
  expresion: string;
  resultado: string;
}

type Funcion = "√" | "sin" | "cos" | "tan" | "log" | "ln" | "x²";

// CONFIGURACIÓN GENERAL
const CONFIG_CALCULADORA = {
  maxHistorial: 50,
  precision: 10,
  toleranciaDecimal: 1e-10,
  gradosARadianes: Math.PI / 180,
};

// MENSAJES DE ERROR
const MENSAJES = {
  expresionInvalida: "Expresión inválida",
  divisionPorCero: "División por cero",
  parentesisIncorrectos: "Paréntesis incorrectos",
  faltaParentesis: "Falta paréntesis",
  faltaCerrarParentesis: "Falta cerrar paréntesis",
  raizInvalida: "Raíz inválida",
  logaritmoInvalido: "Logaritmo inválido",
  numeroInvalido: "Número inválido",
  operacionInvalida: "Operación inválida",
};


const limpiarDecimal = (numero: number): number => {
  if (
    Math.abs(numero) <
    CONFIG_CALCULADORA.toleranciaDecimal
  ) {
    return 0;
  }

  return numero;
};


const seno = (numero: number): number => {
  return limpiarDecimal(
    Math.sin(
      numero * CONFIG_CALCULADORA.gradosARadianes
    )
  );
};

const coseno = (numero: number): number => {
  return limpiarDecimal(
    Math.cos(
      numero * CONFIG_CALCULADORA.gradosARadianes
    )
  );
};

const tangente = (numero: number): number => {
  const radianes =
    numero * CONFIG_CALCULADORA.gradosARadianes;

  if (
    Math.abs(Math.cos(radianes)) <
    CONFIG_CALCULADORA.toleranciaDecimal
  ) {
    throw new Error(MENSAJES.divisionPorCero);
  }

  return limpiarDecimal(Math.tan(radianes));
};

const resolver = (expresion: string): number => {
  const entrada = expresion.replace(/\s/g, "");
  const partes: string[] = [];

  const patron =
    /(?:\d+\.?\d*|\.\d+)|sin|cos|tan|log|ln|[+\-×÷^%()√]/g;

  let coincidencia: RegExpExecArray | null;
  let posicion = 0;

  while ((coincidencia = patron.exec(entrada)) !== null) {
    if (coincidencia.index !== posicion) {
      throw new Error(MENSAJES.expresionInvalida);
    }

    partes.push(coincidencia[0]);
    posicion = patron.lastIndex;
  }

  if (posicion !== entrada.length || partes.length === 0) {
    throw new Error(MENSAJES.expresionInvalida);
  }

  let i = 0;


  const expresionMatematica = (): number => {
    let valor = termino();

    while (partes[i] === "+" || partes[i] === "-") {
      const operador = partes[i++];
      const siguiente = termino();

      valor =
        operador === "+"
          ? valor + siguiente
          : valor - siguiente;
    }

    return valor;
  };

  const termino = (): number => {
    let valor = potencia();

    while (["×", "÷", "%"].includes(partes[i])) {
      const operador = partes[i++];

      if (operador === "%") {
        valor = valor / 100;
        continue;
      }

      const siguiente = potencia();

      if (operador === "×") {
        valor *= siguiente;
      }

      if (operador === "÷") {
        if (siguiente === 0) {
          throw new Error(MENSAJES.divisionPorCero);
        }

        valor /= siguiente;
      }
    }

    return valor;
  };


  const potencia = (): number => {
    const base = unario();

    if (partes[i] === "^") {
      i++;
      return Math.pow(base, potencia());
    }

    return base;
  };


  const unario = (): number => {
    if (partes[i] === "-") {
      i++;
      return -unario();
    }

    if (partes[i] === "+") {
      i++;
      return unario();
    }

    return principal();
  };


  const principal = (): number => {
    const token = partes[i];

    if (token === "(") {
      i++;

      const valor = expresionMatematica();

      if (partes[i] !== ")") {
        throw new Error(MENSAJES.parentesisIncorrectos);
      }

      i++;
      return valor;
    }


    if (
      token === "√" ||
      ["sin", "cos", "tan", "log", "ln"].includes(token)
    ) {
      i++;

      if (partes[i] !== "(") {
        throw new Error(MENSAJES.faltaParentesis);
      }

      i++;

      const numero = expresionMatematica();

      if (partes[i] !== ")") {
        throw new Error(MENSAJES.faltaCerrarParentesis);
      }

      i++;

      switch (token) {
        case "√":
          if (numero < 0) {
            throw new Error(MENSAJES.raizInvalida);
          }

          return Math.sqrt(numero);

        case "sin":
          return seno(numero);

        case "cos":
          return coseno(numero);

        case "tan":
          return tangente(numero);

        case "log":
          if (numero <= 0) {
            throw new Error(MENSAJES.logaritmoInvalido);
          }

          return Math.log10(numero);

        case "ln":
          if (numero <= 0) {
            throw new Error(MENSAJES.logaritmoInvalido);
          }

          return Math.log(numero);
      }
    }

  
    const valor = Number(token);

    if (token === undefined || !Number.isFinite(valor)) {
      throw new Error(MENSAJES.numeroInvalido);
    }

    i++;

    return valor;
  };

  const resultado = expresionMatematica();

  if (i !== partes.length || !Number.isFinite(resultado)) {
    throw new Error(MENSAJES.operacionInvalida);
  }

  return limpiarDecimal(resultado);
};


const formato = (numero: number): string => {
  if (!Number.isFinite(numero)) {
    return "Error";
  }

  const limpio = limpiarDecimal(numero);

  return String(
    Number(
      limpio.toPrecision(CONFIG_CALCULADORA.precision)
    )
  );
};


const useCalculator = () => {
  const [display, setDisplay] = useState("0");

  const [resultado, setResultado] =
    useState<string | null>(null);

  const [operacionMostrada, setOperacionMostrada] =
    useState("");

  const [historial, setHistorial] =
    useState<HistorialItem[]>([]);


  const escribirNumero = (numero: string) => {
    if (resultado !== null) {
      setDisplay(numero === "." ? "0." : numero);
      setResultado(null);
      setOperacionMostrada("");
      return;
    }

    setDisplay((prev) => {
      if (prev === "Error") return numero;

      const ultimo = prev.split(/[+\-×÷^%()]/).pop() || "";

      if (numero === "." && ultimo.includes(".")) {
        return prev;
      }

      if (prev === "0" && numero !== ".") {
        return numero;
      }

      return prev + numero;
    });
  };

  
  const escribirOperador = (operador: string) => {
    if (resultado !== null) {
      setDisplay(resultado + operador);
      setResultado(null);
      setOperacionMostrada("");
      return;
    }

    setDisplay((prev) => {
      if (prev === "Error") return "0";

      if (/[+\-×÷^%]$/.test(prev)) {
        return prev.slice(0, -1) + operador;
      }

      return prev + operador;
    });
  };

  const seleccionarFuncion = (funcion: Funcion) => {
    setResultado(null);
    setOperacionMostrada("");

    setDisplay((prev) => {
      const base =
        prev === "0" || prev === "Error" ? "" : prev;

      if (funcion === "x²") {
        return base + "^2";
      }

      return base + funcion + "(";
    });
  };

  const limpiar = () => {
    setDisplay("0");
    setResultado(null);
    setOperacionMostrada("");
  };

  const borrar = () => {
    setResultado(null);
    setOperacionMostrada("");

    setDisplay((prev) => {
      if (prev === "Error" || prev.length <= 1) {
        return "0";
      }

      return prev.slice(0, -1);
    });
  };

  const cambiarSigno = () => {
    if (resultado !== null) {
      setDisplay(formato(-Number(resultado)));
      setResultado(null);
      setOperacionMostrada("");
      return;
    }

    setDisplay((prev) =>
      prev.startsWith("-")
        ? prev.slice(1)
        : "-" + prev
    );
  };

  const calcular = () => {
    try {
      const expresion = display;

      const abiertos =
        (expresion.match(/\(/g) || []).length;

      const cerrados =
        (expresion.match(/\)/g) || []).length;

      const expresionFinal =
        expresion +
        ")".repeat(Math.max(0, abiertos - cerrados));

      const valor = resolver(expresionFinal);
      const nuevoResultado = formato(valor);

      setDisplay(expresionFinal);
      setOperacionMostrada(expresionFinal);
      setResultado(nuevoResultado);

      setHistorial((prev) =>
        [
          {
            expresion: expresionFinal,
            resultado: nuevoResultado,
          },
          ...prev,
        ].slice(0, CONFIG_CALCULADORA.maxHistorial)
      );
    } catch {
      setResultado("Error");
      setOperacionMostrada(display);
    }
  };

  const limpiarHistorial = () => {
    setHistorial([]);
  };

  return {
    display,
    resultado,
    operacionMostrada,
    historial,

    escribirNumero,
    escribirOperador,
    seleccionarFuncion,

    limpiar,
    borrar,
    cambiarSigno,
    calcular,
    limpiarHistorial,
  };
};

export default useCalculator;
