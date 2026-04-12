import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ThemeProvider from "./context/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { InterviewProvider } from "./pages/Interview/interview.context";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
            <AppRoutes />
        </InterviewProvider>
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
