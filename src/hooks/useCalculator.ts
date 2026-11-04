
import { useState } from "react";

export interface HistorialItem {
  expresion: string;
  resultado: string;
}

type Funcion = "√" | "sin" | "cos" | "tan" | "log" | "ln" | "x²";

// CORREGIR ERRORES DECIMALES TRIGONOMÉTRICOS
const limpiarDecimal = (numero: number): number => {
  if (Math.abs(numero) < 1e-10) return 0;
  return numero;
};

// CONVERTIR A GRADOS Y LIMPIAR DECIMALES
const seno = (numero: number): number => {
  return limpiarDecimal(Math.sin(numero * Math.PI / 180));
};

const coseno = (numero: number): number => {
  return limpiarDecimal(Math.cos(numero * Math.PI / 180));
};

const tangente = (numero: number): number => {
  const radianes = numero * Math.PI / 180;

  if (Math.abs(Math.cos(radianes)) < 1e-10) {
    throw new Error("Tangente indefinida");
  }

  return limpiarDecimal(Math.tan(radianes));
};

// ANALIZADOR MATEMÁTICO
const resolver = (expresion: string): number => {
  const entrada = expresion.replace(/\s/g, "");
  const partes: string[] = [];

  const patron =
    /(?:\d+\.?\d*|\.\d+)|sin|cos|tan|log|ln|[+\-×÷^%()√]/g;

  let coincidencia: RegExpExecArray | null;
  let posicion = 0;

  while ((coincidencia = patron.exec(entrada)) !== null) {
    if (coincidencia.index !== posicion) {
      throw new Error("Expresión inválida");
    }

    partes.push(coincidencia[0]);
    posicion = patron.lastIndex;
  }

  if (posicion !== entrada.length || partes.length === 0) {
    throw new Error("Expresión inválida");
  }

  let i = 0;

  // SUMAS Y RESTAS
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

  // MULTIPLICACIÓN, DIVISIÓN Y PORCENTAJE
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
          throw new Error("División por cero");
        }

        valor /= siguiente;
      }
    }

    return valor;
  };

  // POTENCIAS
  const potencia = (): number => {
    const base = unario();

    if (partes[i] === "^") {
      i++;
      return Math.pow(base, potencia());
    }

    return base;
  };

  // SIGNOS
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

  // NÚMEROS Y FUNCIONES
  const principal = (): number => {
    const token = partes[i];

    // PARÉNTESIS
    if (token === "(") {
      i++;

      const valor = expresionMatematica();

      if (partes[i] !== ")") {
        throw new Error("Paréntesis incorrectos");
      }

      i++;
      return valor;
    }

    // FUNCIONES CIENTÍFICAS
    if (
      token === "√" ||
      ["sin", "cos", "tan", "log", "ln"].includes(token)
    ) {
      i++;

      if (partes[i] !== "(") {
        throw new Error("Falta paréntesis");
      }

      i++;

      const numero = expresionMatematica();

      if (partes[i] !== ")") {
        throw new Error("Falta cerrar paréntesis");
      }

      i++;

      switch (token) {
        case "√":
          if (numero < 0) {
            throw new Error("Raíz inválida");
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
            throw new Error("Logaritmo inválido");
          }

          return Math.log10(numero);

        case "ln":
          if (numero <= 0) {
            throw new Error("Logaritmo inválido");
          }

          return Math.log(numero);
      }
    }

    // NÚMEROS
    const valor = Number(token);

    if (token === undefined || !Number.isFinite(valor)) {
      throw new Error("Número inválido");
    }

    i++;

    return valor;
  };

  const resultado = expresionMatematica();

  if (i !== partes.length || !Number.isFinite(resultado)) {
    throw new Error("Operación inválida");
  }

  return limpiarDecimal(resultado);
};

// FORMATO DEL RESULTADO
const formato = (numero: number): string => {
  if (!Number.isFinite(numero)) {
    return "Error";
  }

  const limpio = limpiarDecimal(numero);

  return String(Number(limpio.toPrecision(10)));
};

// HOOK PRINCIPAL
const useCalculator = () => {
  const [display, setDisplay] = useState("0");

  const [resultado, setResultado] =
    useState<string | null>(null);

  const [operacionMostrada, setOperacionMostrada] =
    useState("");

  const [historial, setHistorial] =
    useState<HistorialItem[]>([]);

  // ESCRIBIR NÚMEROS
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

  // ESCRIBIR OPERADORES
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

  // FUNCIONES CIENTÍFICAS
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

  // LIMPIAR
  const limpiar = () => {
    setDisplay("0");
    setResultado(null);
    setOperacionMostrada("");
  };

  // BORRAR
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

  // CAMBIAR SIGNO
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

  // CALCULAR
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

      // GUARDAR HISTORIAL
      setHistorial((prev) => [
        {
          expresion: expresionFinal,
          resultado: nuevoResultado,
        },
        ...prev,
      ].slice(0, 50));

    } catch {
      setResultado("Error");
      setOperacionMostrada(display);
    }
  };

  // LIMPIAR HISTORIAL
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
