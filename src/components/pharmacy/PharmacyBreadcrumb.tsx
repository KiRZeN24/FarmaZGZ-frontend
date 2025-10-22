"use client";
import Link from "next/link";
import { HiHome } from "react-icons/hi2";

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
          <Link
            href="/"
            className="text-green-600 hover:text-green-800 flex items-center gap-1"
          >
            <HiHome className="text-lg" />
            Inicio
          </Link>
        </li>
        <li>{pharmacyName}</li>
      </ul>
    </div>
  );
}
