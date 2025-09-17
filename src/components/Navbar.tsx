import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-green-50 shadow-md border-b border-green-200">
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost text-xl text-green-800 hover:bg-green-100"
        >
          <span className="text-2xl mr-2">🏥</span>
          FarmaZGZ
        </Link>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#"
            className="btn btn-ghost normal-case text-green-700 hover:bg-green-100"
          >
            Sobre el proyecto
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    alt="Avatar"
                  />
                </div>
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link
                  href="#"
                  className="hover:bg-green-50 hover:text-green-800"
                >
                  Perfil
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:bg-green-50 hover:text-green-800"
                >
                  Salir
                </Link>
              </li>
            </ul>
          </div>
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
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link href="#" className="hover:bg-green-50 hover:text-green-800">
                Sobre el proyecto
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:bg-green-50 hover:text-green-800">
                Perfil
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:bg-green-50 hover:text-green-800">
                Salir
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
