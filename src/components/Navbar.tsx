"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiHome,
  HiUserCircle,
  HiArrowRightOnRectangle,
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
  HiChevronDown,
} from "react-icons/hi2";
import { MdLocalPharmacy } from "react-icons/md";

export default function Navbar() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (pathname === "/login" || pathname === "/registro") {
    return null;
  }

  return (
    <nav className="bg-green-50 shadow-md border-b border-green-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-green-800 hover:text-green-600 transition-colors"
          >
            <MdLocalPharmacy className="text-3xl text-red-500" />
            FarmaZGZ
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden lg:flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors px-3 py-2 rounded-md hover:bg-green-100"
            >
              <HiHome className="text-xl" />
              <span>Inicio</span>
            </Link>

            {loading ? (
              <div className="loading loading-spinner loading-sm"></div>
            ) : isAuthenticated && user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="hidden lg:flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors px-3 py-2 rounded-md hover:bg-green-100"
                  >
                    <HiCog6Tooth className="text-xl" />
                    Panel Admin
                  </Link>
                )}

                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors px-3 py-2 rounded-md hover:bg-green-100"
                  >
                    <HiUserCircle className="text-2xl" />
                    <span>{user.username}</span>
                    <HiChevronDown className="text-lg" />
                  </button>

                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowUserMenu(false)}
                      />

                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-green-200">
                        <Link
                          href="/perfil"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-800"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <HiUserCircle className="text-xl" />
                          Mi Perfil
                        </Link>

                        <hr className="my-1 border-green-100" />

                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <HiArrowRightOnRectangle className="text-xl" />
                          Cerrar Sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>

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
                  <ul className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow border border-green-200">
                    <li className="menu-title">
                      <span>{user.username}</span>
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
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors px-3 py-2 rounded-md hover:bg-green-100"
                  >
                    <HiArrowLeftOnRectangle className="text-xl" />
                    Iniciar Sesión
                  </Link>
                  <Link href="/registro" className="btn farma-btn-primary">
                    Registrarse
                  </Link>
                </div>

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
                  <ul className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow border border-green-200">
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
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
