import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  ViewStyle,
} from "react-native";

import * as Haptics from "expo-haptics";

interface BotonProps {
  texto: string;
  color?: "azul" | "gris" | "blanco" | "verde";
  colorPersonalizado?: string;
  colorTexto?: string;
  ancho?: number;
  onPress?: () => void;
}

const COLORES = {
  azul: "#3478F6",
  verde: "#166534",
  gris: "#193322",
  blanco: "#111A13",
};

const BORDES = {
  azul: "#3478F6",
  verde: "#22C55E",
  gris: "#285C39",
  blanco: "#285C39",
};

const Boton = ({
  texto,
  color = "blanco",
  colorPersonalizado,
  colorTexto,
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

  const estiloPersonalizado: ViewStyle = colorPersonalizado
    ? {
        backgroundColor: colorPersonalizado,
        borderColor: colorPersonalizado,
      }
    : {};

  const textoColor =
    colorTexto ??
    (color === "azul" || color === "verde"
      ? "#FFFFFF"
      : "#A7F3B9");

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.boton,
        styles[color],
        estiloPersonalizado,
        { width: ancho },
      ]}
      onPress={manejarPresion}
    >
      <Text style={[styles.texto, { color: textoColor }]}>
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
    backgroundColor: COLORES.azul,
    borderColor: BORDES.azul,
  },
  verde: {
    backgroundColor: COLORES.verde,
    borderColor: BORDES.verde,
  },
  gris: {
    backgroundColor: COLORES.gris,
    borderColor: BORDES.gris,
  },
  blanco: {
    backgroundColor: COLORES.blanco,
    borderColor: BORDES.blanco,
  },
  texto: {
    fontSize: 22,
    fontWeight: "600",
  },
});
