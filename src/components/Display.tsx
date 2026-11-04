
import { StyleSheet, Text, View } from "react-native";

interface DisplayProps {
  display: string;
  resultado: string | null;
  operacionMostrada: string;
  funcionPendiente: string | null;
}

const Display = ({
  display,
  resultado,
  operacionMostrada,
  funcionPendiente,
}: DisplayProps) => {

  const expresionVisible = funcionPendiente
    ? `${funcionPendiente}(${display})`
    : display;

  return (
    <View style={styles.display}>
      <Text style={styles.etiqueta}>GREEN CALC</Text>

      <Text
        style={styles.numero}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {resultado !== null ? resultado : expresionVisible}
      </Text>

      <View style={styles.divisor} />

      <Text style={styles.operacion} numberOfLines={2}>
        {resultado !== null
          ? operacionMostrada
          : "Introduce tu operación"}
      </Text>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  display: {
    width: "100%",
    minHeight: 165,
    backgroundColor: "#111A13",
    borderRadius: 24,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderWidth: 2,
    borderColor: "#166534",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  etiqueta: {
    fontSize: 12,
    color: "#86C99B",
    marginBottom: 12,
    fontWeight: "600",
    letterSpacing: 2,
  },
  numero: {
    fontSize: 38,
    color: "#4ADE80",
    fontWeight: "bold",
    width: "100%",
    textAlign: "right",
  },
  divisor: {
    height: 1,
    backgroundColor: "#285C39",
    width: "100%",
    marginVertical: 10,
  },
  operacion: {
    fontSize: 16,
    color: "#A7F3B9",
    width: "100%",
    textAlign: "right",
  },
});
