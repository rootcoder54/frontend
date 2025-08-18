"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

// Fonction générique pour le rendu
const renderCell = (value: unknown) => {
  if (typeof value === "boolean") {
    return (
      <Badge variant={value ? "default" : "destructive"}>
        {value ? "Oui" : "Non"}
      </Badge>
    );
  }

  if (typeof value === "number") {
    return <span className="font-medium">{value.toLocaleString()}</span>;
  }

  if (value instanceof Date) {
    return <span>{format(value, "dd/MM/yyyy")}</span>;
  }

  if (typeof value === "string") {
    if (value.includes("@")) {
      return (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      );
    }
    return <span>{value}</span>;
  }

  return <span>-</span>;
};

// Fonction qui génère les colonnes dynamiquement
export function generateColumns<T extends Record<string, unknown>>(
  data: T[]
): ColumnDef<T>[] {
  if (data.length === 0) return [];

  const sample = data[0]; // on prend la première ligne comme modèle

  return Object.keys(sample).map((key) => ({
    accessorKey: key,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {key}
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => renderCell(getValue())
  }));
}

export function buildColumns<T extends Record<string, unknown>>(
  data: T[]
): ColumnDef<T>[] {
  const dynamicCols = generateColumns(data);

  return [
    {
      id: "select",
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    ...dynamicCols
  ];
}
