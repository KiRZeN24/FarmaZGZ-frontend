"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (requireAdmin && user?.role !== "ADMIN") {
        router.push("/");
      }
    }
  }, [loading, isAuthenticated, user, requireAdmin, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin && user?.role !== "ADMIN") {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="alert alert-error max-w-md mx-auto">
          <span>⛔ No tienes permisos para acceder a esta página</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
