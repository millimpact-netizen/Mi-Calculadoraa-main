
import { StyleSheet, Text, View } from "react-native";
import Boton from "./Botones/Boton";

interface RejillaProps {
  escribirNumero: (numero: string) => void;
  escribirOperador: (operador: string) => void;
  seleccionarFuncion: (funcion: "√" | "sin" | "cos" | "tan" | "log" | "ln" | "x²") => void;
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
        <Boton texto="√" color="gris" onPress={() => seleccionarFuncion("√")} />
        <Boton texto="x²" color="gris" onPress={() => seleccionarFuncion("x²")} />
        <Boton texto="sin" color="gris" onPress={() => seleccionarFuncion("sin")} />
        <Boton texto="cos" color="gris" onPress={() => seleccionarFuncion("cos")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="tan" color="gris" onPress={() => seleccionarFuncion("tan")} />
        <Boton texto="log" color="gris" onPress={() => seleccionarFuncion("log")} />
        <Boton texto="ln" color="gris" onPress={() => seleccionarFuncion("ln")} />
        <Boton texto="^" color="verde" onPress={() => escribirOperador("^")} />
      </View>

      <Text style={styles.seccion}>OPERACIONES</Text>

      <View style={styles.fila}>
        <Boton texto="C" color="gris" onPress={limpiar} />
        <Boton texto="E" color="gris" onPress={borrar} />
        <Boton texto="%" color="gris" onPress={() => escribirOperador("%")} />
        <Boton texto="÷" color="verde" onPress={() => escribirOperador("÷")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="7" onPress={() => escribirNumero("7")} />
        <Boton texto="8" onPress={() => escribirNumero("8")} />
        <Boton texto="9" onPress={() => escribirNumero("9")} />
        <Boton texto="×" color="verde" onPress={() => escribirOperador("×")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="4" onPress={() => escribirNumero("4")} />
        <Boton texto="5" onPress={() => escribirNumero("5")} />
        <Boton texto="6" onPress={() => escribirNumero("6")} />
        <Boton texto="−" color="verde" onPress={() => escribirOperador("-")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="1" onPress={() => escribirNumero("1")} />
        <Boton texto="2" onPress={() => escribirNumero("2")} />
        <Boton texto="3" onPress={() => escribirNumero("3")} />
        <Boton texto="+" color="verde" onPress={() => escribirOperador("+")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="±" color="gris" onPress={cambiarSigno} />
        <Boton texto="0" onPress={() => escribirNumero("0")} />
        <Boton texto="." onPress={() => escribirNumero(".")} />
        <Boton texto="=" color="verde" onPress={calcular} />
      </View>

      <View style={styles.fila}>
        <Boton texto="(" color="gris" onPress={() => escribirOperador("(")} />
        <Boton texto=")" color="gris" onPress={() => escribirOperador(")")} />
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
    color: "#4ADE80",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 12,
    marginBottom: 4,
  },
});
