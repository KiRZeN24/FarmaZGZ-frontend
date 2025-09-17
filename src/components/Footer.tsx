import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-100 text-green-800 p-6 border-t border-green-200 text-center">
      <div className="flex flex-col items-center space-y-3">
        <p className="text-sm text-green-700">
          Copyright © {new Date().getFullYear()} - Farmacias de Guardia en
          Zaragoza
        </p>
      </div>
    </footer>
  );
}
