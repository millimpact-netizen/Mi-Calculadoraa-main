
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { HistorialItem } from "../hooks/useCalculator";

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
        <Text style={styles.titulo}>HISTORIAL</Text>

        <TouchableOpacity onPress={limpiarHistorial}>
          <Text style={styles.borrar}>BORRAR</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.lista}>
        {historial.length === 0 ? (
          <Text style={styles.vacio}>
            Todavía no hay operaciones
          </Text>
        ) : (
          historial.map((item, index) => (
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
    backgroundColor: "#111A13",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#166534",
    padding: 15,
    marginTop: 20,
    maxHeight: 220,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titulo: {
    color: "#4ADE80",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  borrar: {
    color: "#86C99B",
    fontSize: 12,
    fontWeight: "bold",
  },
  lista: {
    flexGrow: 0,
  },
  vacio: {
    color: "#668F73",
    textAlign: "center",
    padding: 15,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#285C39",
    paddingVertical: 10,
  },
  expresion: {
    color: "#86C99B",
    fontSize: 14,
  },
  resultado: {
    color: "#4ADE80",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "right",
  },
});

