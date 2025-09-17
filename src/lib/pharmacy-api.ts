import { Pharmacy } from "@/types";
interface ApiPharmacy {
  id: number | string;
  name?: string;
  nombre?: string;
  address?: string;
  direccion?: string;
  phone?: string;
  telefono?: string;
  hours?: string;
  horario?: string;
}

export async function getAllPharmacies(): Promise<Pharmacy[]> {
  try {
    const response = await fetch(
      "https://farmazgz.onrender.com/api/pharmacies",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener farmacias");
    }

    const data = await response.json();

    return data.map(
      (item: ApiPharmacy): Pharmacy => ({
        id: item.id.toString(),
        name: item.name || item.nombre || "Farmacia sin nombre",
        address: item.address || item.direccion || "Dirección no disponible",
        phone: item.phone || item.telefono || "No disponible",
        hours: item.hours || item.horario || "Consultar horario",
      })
    );
  } catch (error) {
    console.error("Error fetching pharmacies:", error);

    return [
      {
        id: "1",
        name: "Farmacia Central",
        address: "Calle Mayor, 15, 50001 Zaragoza",
        phone: "976 123 456",
        hours: "24 horas",
      },
      {
        id: "2",
        name: "Farmacia San Pablo",
        address: "Paseo Sagasta, 32, 50008 Zaragoza",
        phone: "976 234 567",
        hours: "Lunes a Sábado: 9:00-22:00",
      },
    ];
  }
}

export async function getPharmacyById(id: string): Promise<Pharmacy | null> {
  try {
    const pharmacies = await getAllPharmacies();
    return pharmacies.find((pharmacy) => pharmacy.id === id) || null;
  } catch (error) {
    console.error(`Error fetching pharmacy ${id}:`, error);
    return null;
  }
}
