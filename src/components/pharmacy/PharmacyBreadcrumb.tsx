"use client";
import Link from "next/link";

interface PharmacyBreadcrumbProps {
  pharmacyName: string;
}

export default function PharmacyBreadcrumb({
  pharmacyName,
}: PharmacyBreadcrumbProps) {
  return (
    <div className="breadcrumbs text-sm mb-6">
      <ul>
        <li>
          <Link href="/" className="text-green-600 hover:text-green-800">
            Inicio
          </Link>
        </li>
        <li>{pharmacyName}</li>
      </ul>
    </div>
  );
}
