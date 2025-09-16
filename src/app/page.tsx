import PharmacyContainer from "@/components/PharmacyContainer";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        FarmaZGZ - Farmacias de Guardia
      </h1>
      <PharmacyContainer />
    </main>
  );
}
