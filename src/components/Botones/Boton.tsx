
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
} from "react-native";

import * as Haptics from "expo-haptics";

interface BotonProps {
  texto: string;
  color?: "azul" | "gris" | "blanco" | "verde";
  ancho?: number;
  onPress?: () => void;
}

const Boton = ({
  texto,
  color = "blanco",
  ancho = 60,
  onPress,
}: BotonProps) => {

  const manejarPresion = async () => {
    try {
      if (Platform.OS === "android") {
        Vibration.vibrate(50);
        await Haptics.performAndroidHapticsAsync(
          Haptics.AndroidHaptics.Keyboard_Tap
        );
      } else if (Platform.OS === "ios") {
        await Haptics.impactAsync(
          Haptics.ImpactFeedbackStyle.Medium
        );
      }
    } catch (error) {
      console.log("Error de vibración:", error);
    }

    onPress?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.boton,
        styles[color],
        { width: ancho },
      ]}
      onPress={manejarPresion}
    >
      <Text
        style={[
          styles.texto,
          (color === "azul" || color === "verde") &&
            styles.textoBlanco,
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
    borderWidth: 1,
  },
  azul: {
    backgroundColor: "#3478F6",
    borderColor: "#3478F6",
  },
  verde: {
    backgroundColor: "#166534",
    borderColor: "#22C55E",
  },
  gris: {
    backgroundColor: "#193322",
    borderColor: "#285C39",
  },
  blanco: {
    backgroundColor: "#111A13",
    borderColor: "#285C39",
  },
  texto: {
    fontSize: 22,
    color: "#A7F3B9",
    fontWeight: "600",
  },
  textoBlanco: {
    color: "#FFFFFF",
  },
});
