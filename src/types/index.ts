export * from "./pharmacy.types";
export interface Pharmacy {
  id: string;
  external_id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
  guard_date: string;
  last_updated: string;
}
