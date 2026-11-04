import { StyleSheet, Text, View } from "react-native";

interface DisplayProps {
  display: string;
}

const Display = ({ display }: DisplayProps) => {
  return (
    <View style={styles.display}>
      <Text style={styles.etiqueta}>Calculadora</Text>
      <Text style={styles.numero}>{display}</Text>
    </View>
  );
};

export default Display;
const styles = StyleSheet.create({
  display: {
    width: "100%",
    minHeight: 150,
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
    marginBottom: 8,
    fontWeight: "600",
  },
  numero: {
    fontSize: 36,
    color: "#4ADE80",
    fontWeight: "bold",
  },
});
