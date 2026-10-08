import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import InventoryListPage from "@/pages/InventoryListPage";
import InventoryFormPage from "@/pages/InventoryFormPage";
import InventoryDetailPage from "@/pages/InventoryDetailPage";
import StorefrontHome from "@/pages/StorefrontHome";

const STAFF = ["owner", "admin", "staf"];

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<StorefrontHome />} />
          <Route path="/masuk" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={STAFF}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="inventaris" element={<InventoryListPage />} />
            <Route path="inventaris/baru" element={<InventoryFormPage mode="create" />} />
            <Route path="inventaris/:id" element={<InventoryDetailPage />} />
            <Route path="inventaris/:id/edit" element={<InventoryFormPage mode="edit" />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
