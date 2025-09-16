export default function LoadingSpinner() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-black">Cargando farmacias...</p>
      </div>
    </main>
  );
}
