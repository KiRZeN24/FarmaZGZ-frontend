import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar farma-navbar">
      <div className="flex-1">
        <Link href="/" className="farma-logo">
          <span className="text-2xl mr-2">🏥</span>
          FarmaZGZ
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="#" className="farma-btn-ghost">
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
              <Link href="#" className="farma-dropdown-item">
                Perfil
              </Link>
            </li>
            <li>
              <Link href="#" className="farma-dropdown-item">
                Salir
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
