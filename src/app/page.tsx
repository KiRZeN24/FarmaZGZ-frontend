export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        FarmaZGZ - Farmacias de Guardia
      </h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Farmacias de Guardia Hoy
          </h2>
          <p className="text-gray-600 mb-4">
            Encuentra las farmacias de guardia abiertas hoy en Zaragoza
          </p>

          {/* Placeholder para la lista de farmacias */}
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="font-medium">Farmacia Central</h3>
              <p className="text-sm text-gray-600">Calle Mayor, 123</p>
              <p className="text-sm text-gray-500">Abierta 24h</p>
            </div>

            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h3 className="font-medium">Farmacia San Pablo</h3>
              <p className="text-sm text-gray-600">
                Avenida César Augusto, 456
              </p>
              <p className="text-sm text-gray-500">9:00 - 22:00</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Datos actualizados desde la API del Ayuntamiento de Zaragoza
          </p>
        </div>
      </div>
    </main>
  );
}
