import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center">
      <div className="farma-card max-w-md mx-auto">
        <div className="text-6xl mb-4">🏥</div>
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          Farmacia no encontrada
        </h1>
        <p className="text-gray-600 mb-6">
          La farmacia que buscas no existe o ha sido eliminada.
        </p>
        <Link href="/" className="btn farma-btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
