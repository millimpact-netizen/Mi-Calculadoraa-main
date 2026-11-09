
import { Stack } from "expo-router";

// CONFIGURACIÓN DE NAVEGACIÓN
const CONFIG_NAVEGACION = {
  mostrarEncabezado: false,
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: CONFIG_NAVEGACION.mostrarEncabezado,
      }}
    />
  );
}
