import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => {
  console.log("App.tsx loaded, router initialized.");
  // In a real application, authentication state would be managed here or in a context
  // and used to protect routes. For this example, all routes are publicly accessible.

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster /> {/* For shadcn/ui Toasts */}
        <SonnerToaster /> {/* For sonner Toasts */}
        <BrowserRouter>
          <Routes>
            {/* Default route redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Authentication Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Application Main Page (Protected Route in a real app) */}
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Catch-all Not Found Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;