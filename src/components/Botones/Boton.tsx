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
  colorBordePersonalizado?: string;
  colorTexto?: string;
  ancho?: number;
  onPress?: () => void;
}

const CONFIG_BOTON = {
  colores: {
    azul: "#3478F6",
    verde: "#166534",
    gris: "#193322",
    blanco: "#111A13",
  },

  bordes: {
    azul: "#3478F6",
    verde: "#22C55E",
    gris: "#285C39",
    blanco: "#285C39",
  },

  texto: {
    claro: "#FFFFFF",
    verde: "#A7F3B9",
  },

  altura: 60,
  radioBorde: 18,
  grosorBorde: 1,
  tamanoTexto: 22,
};

const Boton = ({
  texto,
  color = "blanco",
  colorPersonalizado,
  colorBordePersonalizado,
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

  const estiloPersonalizado: ViewStyle = {
    ...(colorPersonalizado
      ? { backgroundColor: colorPersonalizado }
      : {}),
    ...(colorBordePersonalizado
      ? { borderColor: colorBordePersonalizado }
      : {}),
  };

  const textoColor =
    colorTexto ??
    (color === "azul" || color === "verde"
      ? CONFIG_BOTON.texto.claro
      : CONFIG_BOTON.texto.verde);

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
    height: CONFIG_BOTON.altura,
    borderRadius: CONFIG_BOTON.radioBorde,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: CONFIG_BOTON.grosorBorde,
  },

  azul: {
    backgroundColor: CONFIG_BOTON.colores.azul,
    borderColor: CONFIG_BOTON.bordes.azul,
  },

  verde: {
    backgroundColor: CONFIG_BOTON.colores.verde,
    borderColor: CONFIG_BOTON.bordes.verde,
  },

  gris: {
    backgroundColor: CONFIG_BOTON.colores.gris,
    borderColor: CONFIG_BOTON.bordes.gris,
  },

  blanco: {
    backgroundColor: CONFIG_BOTON.colores.blanco,
    borderColor: CONFIG_BOTON.bordes.blanco,
  },

  texto: {
    fontSize: CONFIG_BOTON.tamanoTexto,
    fontWeight: "600",
  },
});
