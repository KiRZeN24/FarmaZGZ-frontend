import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 bg-green-50 shadow-md border-b border-green-100">
      <Link href="/" className="btn btn-ghost text-xl text-green-800">
        <span className="text-2xl mr-2">🏥</span>
        FarmaZGZ
      </Link>

      <div className="flex items-center space-x-2">
        <Link href="#" className="btn btn-ghost normal-case text-green-700">
          ¿Sobre el proyecto?
        </Link>
        <button className="btn rounded-full bg-green-600 hover:bg-green-700 text-white border-none px-3 py-1">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
