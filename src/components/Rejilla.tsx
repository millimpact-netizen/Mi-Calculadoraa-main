
import { StyleSheet, Text, View } from "react-native";
import Boton from "./Botones/Boton";


const COLORES = {
  cientificos: "#193322",
  borrar: "#193322",
  operadores: "#166534",
  numeros: "#111A13",
  igual: "#166534",
  parentesis: "#193322",
  textoNumeros: "#A7F3B9",
  textoOperadores: "#FFFFFF",
  titulo: "#4ADE80",
};


const OPERADOR_DIVISION = "÷";
const OPERADOR_MULTIPLICACION = "×";
const OPERADOR_RESTA = "-";
const OPERADOR_SUMA = "+";

interface RejillaProps {
  escribirNumero: (numero: string) => void;
  escribirOperador: (operador: string) => void;
  seleccionarFuncion: (
    funcion: "√" | "sin" | "cos" | "tan" | "log" | "ln" | "x²"
  ) => void;
  limpiar: () => void;
  borrar: () => void;
  cambiarSigno: () => void;
  calcular: () => void;
}

const Rejilla = ({
  escribirNumero,
  escribirOperador,
  seleccionarFuncion,
  limpiar,
  borrar,
  cambiarSigno,
  calcular,
}: RejillaProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.seccion}>MODO CIENTÍFICO</Text>

      <View style={styles.fila}>
        <Boton texto="√" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => seleccionarFuncion("√")} />
        <Boton texto="x²" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => seleccionarFuncion("x²")} />
        <Boton texto="sin" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => seleccionarFuncion("sin")} />
        <Boton texto="cos" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => seleccionarFuncion("cos")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="tan" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => seleccionarFuncion("tan")} />
        <Boton texto="log" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => seleccionarFuncion("log")} />
        <Boton texto="ln" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => seleccionarFuncion("ln")} />
        <Boton texto="^" colorPersonalizado={COLORES.operadores} colorTexto={COLORES.textoOperadores} onPress={() => escribirOperador("^")} />
      </View>

      <Text style={styles.seccion}>OPERACIONES</Text>

      <View style={styles.fila}>
        <Boton texto="C" colorPersonalizado={COLORES.borrar} colorTexto={COLORES.textoNumeros} onPress={limpiar} />
        <Boton texto="E" colorPersonalizado={COLORES.borrar} colorTexto={COLORES.textoNumeros} onPress={borrar} />
        <Boton texto="%" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={() => escribirOperador("%")} />
        <Boton texto={OPERADOR_DIVISION} colorPersonalizado={COLORES.operadores} colorTexto={COLORES.textoOperadores} onPress={() => escribirOperador(OPERADOR_DIVISION)} />
      </View>

      <View style={styles.fila}>
        <Boton texto="7" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("7")} />
        <Boton texto="8" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("8")} />
        <Boton texto="9" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("9")} />
        <Boton texto={OPERADOR_MULTIPLICACION} colorPersonalizado={COLORES.operadores} colorTexto={COLORES.textoOperadores} onPress={() => escribirOperador(OPERADOR_MULTIPLICACION)} />
      </View>

      <View style={styles.fila}>
        <Boton texto="4" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("4")} />
        <Boton texto="5" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("5")} />
        <Boton texto="6" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("6")} />
        <Boton texto="−" colorPersonalizado={COLORES.operadores} colorTexto={COLORES.textoOperadores} onPress={() => escribirOperador(OPERADOR_RESTA)} />
      </View>

      <View style={styles.fila}>
        <Boton texto="1" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("1")} />
        <Boton texto="2" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("2")} />
        <Boton texto="3" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("3")} />
        <Boton texto="+" colorPersonalizado={COLORES.operadores} colorTexto={COLORES.textoOperadores} onPress={() => escribirOperador(OPERADOR_SUMA)} />
      </View>

      <View style={styles.fila}>
        <Boton texto="±" colorPersonalizado={COLORES.cientificos} colorTexto={COLORES.textoNumeros} onPress={cambiarSigno} />
        <Boton texto="0" colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero("0")} />
        <Boton texto="." colorPersonalizado={COLORES.numeros} colorTexto={COLORES.textoNumeros} onPress={() => escribirNumero(".")} />
        <Boton texto="=" colorPersonalizado={COLORES.igual} colorTexto={COLORES.textoOperadores} onPress={calcular} />
      </View>

      <View style={styles.fila}>
        <Boton texto="(" colorPersonalizado={COLORES.parentesis} colorTexto={COLORES.textoNumeros} onPress={() => escribirOperador("(")} />
        <Boton texto=")" colorPersonalizado={COLORES.parentesis} colorTexto={COLORES.textoNumeros} onPress={() => escribirOperador(")")} />
      </View>
    </View>
  );
};

export default Rejilla;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 9,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  seccion: {
    color: COLORES.titulo,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 12,
    marginBottom: 4,
  },
});
