import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ThemeProvider from "./context/ThemeProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
        <Toaster
        position="top-center"
        richColors
        closeButton
      />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
