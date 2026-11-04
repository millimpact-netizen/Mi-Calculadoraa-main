
import { useState } from "react";

const useCalculator = () => {
  const [display, setDisplay] = useState("0 + 0");

  const escribirNumero = (numero: string) => {
    setDisplay((anterior) => {
      if (anterior === "0 + 0" || anterior === "0") {
        return numero;
      }

      return anterior + numero;
    });
  };

  const escribirOperador = (operador: string) => {
    setDisplay((anterior) => anterior + " " + operador + " ");
  };

  const limpiar = () => {
    setDisplay("0 + 0");
  };

  const borrar = () => {
    setDisplay((anterior) => {
      const nuevo = anterior.slice(0, -1).trimEnd();

      return nuevo === "" ? "0 + 0" : nuevo;
    });
  };

  const cambiarSigno = () => {
    setDisplay((anterior) => {
      if (anterior.startsWith("-")) {
        return anterior.slice(1);
      }

      return "-" + anterior;
    });
  };

  const calcular = () => {
    setDisplay((expresion) => {
      let numero = "";
      let numeros: number[] = [];
      let operadores: string[] = [];

      for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];

        if (
          (caracter >= "0" && caracter <= "9") ||
          caracter === "."
        ) {
          numero += caracter;
        } else if (
          caracter === "+" ||
          caracter === "-" ||
          caracter === "×" ||
          caracter === "÷"
        ) {
          if (caracter === "-" && numero === "") {
            numero = "-";
          } else {
            if (numero === "" || numero === "-") {
              return expresion;
            }

            numeros.push(Number(numero));
            operadores.push(caracter);
            numero = "";
          }
        }
      }

      if (numero === "" || numero === "-") {
        return expresion;
      }

      numeros.push(Number(numero));

      let resultado = numeros[0];

      for (let i = 0; i < operadores.length; i++) {
        const siguiente = numeros[i + 1];

        if (operadores[i] === "+") {
          resultado += siguiente;
        } else if (operadores[i] === "-") {
          resultado -= siguiente;
        } else if (operadores[i] === "×") {
          resultado *= siguiente;
        } else if (operadores[i] === "÷") {
          if (siguiente === 0) {
            return "Error";
          }

          resultado /= siguiente;
        }
      }

      return String(Number(resultado.toFixed(8)));
    });
  };

  return {
    display,
    escribirNumero,
    escribirOperador,
    limpiar,
    borrar,
    cambiarSigno,
    calcular,
  };
};

export default useCalculator;
