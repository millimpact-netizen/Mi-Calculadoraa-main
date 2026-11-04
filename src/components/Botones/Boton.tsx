import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface BotonProps {
  texto: string;
  color?: "verde" | "gris" | "blanco";
  ancho?: number;
  onPress?: () => void;
}

const Boton = ({
  texto,
  color = "blanco",
  ancho = 60,
  onPress,
}: BotonProps) => {
  return (
    <TouchableOpacity
      style={[styles.boton, styles[color], { width: ancho }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.texto,
          color === "verde" && styles.textoBlanco,
        ]}
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
};

export default Boton;

const styles = StyleSheet.create({
  boton: {
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  verde: {
    backgroundColor: "#14532D",
    borderColor: "#22C55E",
  },
  gris: {
    backgroundColor: "#17251B",
    borderColor: "#285C39",
  },
  blanco: {
    backgroundColor: "#111A13",
    borderColor: "#285C39",
  },
  texto: {
    fontSize: 25,
    color: "#A7F3B9",
    fontWeight: "600",
  },
  textoBlanco: {
    color: "#FFFFFF",
  },
});
