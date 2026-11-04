
import { StyleSheet, View } from "react-native";
import Boton from "./Botones/Boton";

interface RejillaProps {
  escribirNumero: (numero: string) => void;
  escribirOperador: (operador: string) => void;
  limpiar: () => void;
  borrar: () => void;
  cambiarSigno: () => void;
  calcular: () => void;
}

const Rejilla = ({
  escribirNumero,
  escribirOperador,
  limpiar,
  borrar,
  cambiarSigno,
  calcular,
}: RejillaProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.fila}>
        <Boton texto="C" color="gris" onPress={limpiar} />
        <Boton texto="E" color="gris" onPress={borrar} />
        <Boton texto="%" color="gris" onPress={() => escribirOperador("%")} />
        <Boton texto="÷" color="azul" onPress={() => escribirOperador("÷")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="7" onPress={() => escribirNumero("7")} />
        <Boton texto="8" onPress={() => escribirNumero("8")} />
        <Boton texto="9" onPress={() => escribirNumero("9")} />
        <Boton texto="×" color="azul" onPress={() => escribirOperador("×")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="4" onPress={() => escribirNumero("4")} />
        <Boton texto="5" onPress={() => escribirNumero("5")} />
        <Boton texto="6" onPress={() => escribirNumero("6")} />
        <Boton texto="−" color="azul" onPress={() => escribirOperador("-")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="1" onPress={() => escribirNumero("1")} />
        <Boton texto="2" onPress={() => escribirNumero("2")} />
        <Boton texto="3" onPress={() => escribirNumero("3")} />
        <Boton texto="+" color="azul" onPress={() => escribirOperador("+")} />
      </View>

      <View style={styles.fila}>
        <Boton texto="±" color="gris" onPress={cambiarSigno} />
        <Boton texto="0" ancho={68} onPress={() => escribirNumero("0")} />
        <Boton texto="." onPress={() => escribirNumero(".")} />
        <Boton texto="=" color="azul" onPress={calcular} />
      </View>
    </View>
  );
};

export default Rejilla;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

