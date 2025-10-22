"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { MdLocalPharmacy } from "react-icons/md";
import {
  HiUserCircle,
  HiArrowRightOnRectangle,
  HiCog6Tooth,
} from "react-icons/hi2";

export default function Navbar() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/registro") {
    return null;
  }

  return (
    <div className="navbar bg-green-50 shadow-md border-b border-green-200">
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost text-xl text-green-800 hover:bg-green-100"
        >
          <MdLocalPharmacy className="text-3xl text-red-500 mr-2" />
          FarmaZGZ
        </Link>
      </div>

      <div className="navbar-end">
        {loading ? (
          <div className="loading loading-spinner loading-sm"></div>
        ) : isAuthenticated && user ? (
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-green-700 font-medium">
              Hola, {user.username}
            </span>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="btn btn-ghost normal-case text-green-700 hover:bg-green-100"
              >
                Panel Admin
              </Link>
            )}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-800 font-bold text-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link
                    href="/perfil"
                    className="hover:bg-green-50 hover:text-green-800 flex items-center gap-2"
                  >
                    <HiUserCircle className="text-xl" />
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                  >
                    <HiArrowRightOnRectangle className="text-xl" />
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="btn btn-ghost normal-case text-green-700 hover:bg-green-100"
            >
              Iniciar Sesión
            </Link>
            <Link href="/registro" className="btn farma-btn-primary">
              Registrarse
            </Link>
          </div>
        )}

        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square text-green-800 hover:bg-green-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {isAuthenticated && user ? (
              <>
                <li className="menu-title">
                  <span>Hola, {user.username}</span>
                </li>
                <li>
                  <Link
                    href="/perfil"
                    className="hover:bg-green-50 hover:text-green-800 flex items-center gap-2"
                  >
                    <HiUserCircle className="text-xl" />
                    Mi Perfil
                  </Link>
                </li>
                {user.role === "ADMIN" && (
                  <li>
                    <Link
                      href="/admin"
                      className="hover:bg-green-50 hover:text-green-800 flex items-center gap-2"
                    >
                      <HiCog6Tooth className="text-xl" />
                      Panel Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={logout}
                    className="hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                  >
                    <HiArrowRightOnRectangle className="text-xl" />
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="hover:bg-green-50 hover:text-green-800"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registro"
                    className="hover:bg-green-50 hover:text-green-800"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
