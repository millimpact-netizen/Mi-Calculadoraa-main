
import { StyleSheet, Text, View } from "react-native";

// CONFIGURACIÓN: CAMBIA AQUÍ LOS COLORES, TEXTOS Y TAMAÑOS
const DISPLAY_CONFIG = {
  fondo: "#111A13",
  borde: "#166534",
  sombra: "#22C55E",
  etiqueta: "#86C99B",
  numero: "#4ADE80",
  divisor: "#285C39",
  operacion: "#A7F3B9",

  titulo: "GREEN CALC",
  mensajeInicial: "Introduce tu operación",

  alturaMinima: 165,
  radioBorde: 24,
  tamanoNumero: 38,
  tamanoOperacion: 16,
};

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

  const textoPrincipal =
    resultado !== null ? resultado : expresionVisible;

  const textoOperacion =
    resultado !== null
      ? operacionMostrada
      : DISPLAY_CONFIG.mensajeInicial;

  return (
    <View style={styles.display}>
      <Text style={styles.etiqueta}>
        {DISPLAY_CONFIG.titulo}
      </Text>

      <Text
        style={styles.numero}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {textoPrincipal}
      </Text>

      <View style={styles.divisor} />

      <Text style={styles.operacion} numberOfLines={2}>
        {textoOperacion}
      </Text>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  display: {
    width: "100%",
    minHeight: DISPLAY_CONFIG.alturaMinima,
    backgroundColor: DISPLAY_CONFIG.fondo,
    borderRadius: DISPLAY_CONFIG.radioBorde,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderWidth: 2,
    borderColor: DISPLAY_CONFIG.borde,
    shadowColor: DISPLAY_CONFIG.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  etiqueta: {
    fontSize: 12,
    color: DISPLAY_CONFIG.etiqueta,
    marginBottom: 12,
    fontWeight: "600",
    letterSpacing: 2,
  },
  numero: {
    fontSize: DISPLAY_CONFIG.tamanoNumero,
    color: DISPLAY_CONFIG.numero,
    fontWeight: "bold",
    width: "100%",
    textAlign: "right",
  },
  divisor: {
    height: 1,
    backgroundColor: DISPLAY_CONFIG.divisor,
    width: "100%",
    marginVertical: 10,
  },
  operacion: {
    fontSize: DISPLAY_CONFIG.tamanoOperacion,
    color: DISPLAY_CONFIG.operacion,
    width: "100%",
    textAlign: "right",
  },
});
