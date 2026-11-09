
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { HistorialItem } from "../hooks/useCalculator";


const HISTORIAL_CONFIG = {
  fondo: "#111A13",
  borde: "#166534",
  titulo: "#4ADE80",
  botonBorrar: "#86C99B",
  textoVacio: "#668F73",
  expresion: "#86C99B",
  resultado: "#4ADE80",
  separador: "#285C39",
  tituloTexto: "HISTORIAL",
  borrarTexto: "BORRAR",
  vacioTexto: "Todavía no hay operaciones",
  maxAltura: 220,
  maxElementos: 50,
};

interface HistorialProps {
  historial: HistorialItem[];
  limpiarHistorial: () => void;
}

const Historial = ({
  historial,
  limpiarHistorial,
}: HistorialProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>
          {HISTORIAL_CONFIG.tituloTexto}
        </Text>

        <TouchableOpacity onPress={limpiarHistorial}>
          <Text style={styles.borrar}>
            {HISTORIAL_CONFIG.borrarTexto}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.lista}>
        {historial.length === 0 ? (
          <Text style={styles.vacio}>
            {HISTORIAL_CONFIG.vacioTexto}
          </Text>
        ) : (
          historial
            .slice(0, HISTORIAL_CONFIG.maxElementos)
            .map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.expresion}>
                  {item.expresion}
                </Text>

                <Text style={styles.resultado}>
                  = {item.resultado}
                </Text>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
};

export default Historial;

const styles = StyleSheet.create({
  container: {
    backgroundColor: HISTORIAL_CONFIG.fondo,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: HISTORIAL_CONFIG.borde,
    padding: 15,
    marginTop: 20,
    maxHeight: HISTORIAL_CONFIG.maxAltura,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titulo: {
    color: HISTORIAL_CONFIG.titulo,
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  borrar: {
    color: HISTORIAL_CONFIG.botonBorrar,
    fontSize: 12,
    fontWeight: "bold",
  },
  lista: {
    flexGrow: 0,
  },
  vacio: {
    color: HISTORIAL_CONFIG.textoVacio,
    textAlign: "center",
    padding: 15,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: HISTORIAL_CONFIG.separador,
    paddingVertical: 10,
  },
  expresion: {
    color: HISTORIAL_CONFIG.expresion,
    fontSize: 14,
  },
  resultado: {
    color: HISTORIAL_CONFIG.resultado,
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "right",
  },
});
