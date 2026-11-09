
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

// CONFIGURACIÓN DE LA PANTALLA
const CONFIG_PANTALLA = {
  fondo: "#080D09",
  titulo: "#4ADE80",
  subtitulo: "#86C99B",
  icono: "#22C55E",
  pie: "#416B4D",

  nombre: "GREEN CALC",
  descripcion: "CALCULADORA CIENTÍFICA",
  textoPie: "GREEN CALC • SCIENTIFIC EDITION",

  tamanoTitulo: 27,
  tamanoSubtitulo: 10,
  espacioHorizontal: 20,
  espacioSuperior: 60,
  espacioInferior: 30,
};

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
            <Text style={styles.titulo}>
              {CONFIG_PANTALLA.nombre}
            </Text>

            <Text style={styles.subtitulo}>
              {CONFIG_PANTALLA.descripcion}
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
          {CONFIG_PANTALLA.textoPie}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONFIG_PANTALLA.fondo,
  },
  contenido: {
    paddingHorizontal: CONFIG_PANTALLA.espacioHorizontal,
    paddingTop: CONFIG_PANTALLA.espacioSuperior,
    paddingBottom: CONFIG_PANTALLA.espacioInferior,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  titulo: {
    fontSize: CONFIG_PANTALLA.tamanoTitulo,
    fontWeight: "bold",
    color: CONFIG_PANTALLA.titulo,
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: CONFIG_PANTALLA.tamanoSubtitulo,
    color: CONFIG_PANTALLA.subtitulo,
    letterSpacing: 2,
    marginTop: 5,
  },
  icono: {
    fontSize: 30,
    color: CONFIG_PANTALLA.icono,
  },
  pie: {
    color: CONFIG_PANTALLA.pie,
    textAlign: "center",
    fontSize: 10,
    marginTop: 25,
    letterSpacing: 2,
  },
});
