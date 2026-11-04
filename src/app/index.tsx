
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Display from "../components/Display";
import Historial from "../components/Historial";
import Rejilla from "../components/Rejilla";
import useCalculator from "../hooks/useCalculator";

export default function Index() {
  const {
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
  } = useCalculator();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenido}
      >
        <View style={styles.encabezado}>
          <View>
            <Text style={styles.titulo}>GREEN CALC</Text>
            <Text style={styles.subtitulo}>
              CALCULADORA CIENTÍFICA
            </Text>
          </View>

          <Text style={styles.icono}></Text>
        </View>

        <Display
          display={display}
          resultado={resultado}
          operacionMostrada={operacionMostrada}
          funcionPendiente={null}
        />

        <Rejilla
          escribirNumero={escribirNumero}
          escribirOperador={escribirOperador}
          seleccionarFuncion={seleccionarFuncion}
          limpiar={limpiar}
          borrar={borrar}
          cambiarSigno={cambiarSigno}
          calcular={calcular}
        />

        <Historial
          historial={historial}
          limpiarHistorial={limpiarHistorial}
        />

        <Text style={styles.pie}>
          GREEN CALC • SCIENTIFIC EDITION
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080D09",
  },
  contenido: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  titulo: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#4ADE80",
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 10,
    color: "#86C99B",
    letterSpacing: 2,
    marginTop: 5,
  },
  icono: {
    fontSize: 30,
    color: "#22C55E",
  },
  pie: {
    color: "#416B4D",
    textAlign: "center",
    fontSize: 10,
    marginTop: 25,
    letterSpacing: 2,
  },
});
