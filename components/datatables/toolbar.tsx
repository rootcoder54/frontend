"use client";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchId?: string;
  searchPlaceholder?: string;
  links?: {
    name: string;
    icon: React.ReactNode;
    lien: string;
    className?:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null;
  }[];
  selectlinks?: {
    name: string;
    icon: React.ReactNode;
    action: (id: string) => void;
    className?:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null;
  }[];
}

function DataToolBar<TData>({
  table,
  searchId,
  searchPlaceholder,
  links,
  selectlinks
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const deselectRows = () => {
    table.getState().rowSelection = {};
    table.setRowSelection({});
  };
  const rowSelected = table.getState().rowSelection;
  const [id, setId] = useState("");
  const selectedRowsData = table
    .getRowModel()
    .rows.filter((row) => rowSelected[row.id]);
  useEffect(() => {
    selectedRowsData.forEach((row) => {
      const rowData = row.original as { id: string & unknown };
      setId(rowData.id);
    });
  }, [selectedRowsData]);

  return (
    <div className="flex items-center py-4 w-full h-20">
      <div className="flex flex-col items-center w-full">
        {table.getFilteredSelectedRowModel().rows.length == 0 ? (
          <div className="flex flex-row items-center justify-start w-full gap-3 py-2">
            <Input
              placeholder={`${
                searchPlaceholder ? searchPlaceholder : "Filter"
              }`}
              value={
                (table.getColumn(`${searchId}`)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(`${searchId}`)
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            {isFiltered && (
              <Button
                variant="destructive"
                onClick={() => {
                  table.resetColumnFilters();
                }}
                className="h-8 px-2 lg:px-3"
              >
                Effacer les filtres
                <X />
              </Button>
            )}
            {links &&
              links.map((link) => (
                <Link key={link.lien} href={`${link.lien}`}>
                  <Button variant={link.className}>
                    {link.icon} {link.name}
                  </Button>
                </Link>
              ))}
          </div>
        ) : (
          <div className="flex flex-row items-center justify-start w-full gap-x-1 rounded-lg bg-zinc-300/30 px-1 py-1">
            {selectlinks && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="size-8"
                    onClick={deselectRows}
                  >
                    <X />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Déselectionné</p>
                </TooltipContent>
              </Tooltip>
            )}
            <span>1 sélectionné</span>
            {selectlinks &&
              selectlinks.map((link) => (
                <Tooltip key={link.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={link.className}
                      size={"icon"}
                      className="size-8"
                      onClick={() => {
                        link.action(id);
                      }}
                    >
                      {link.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DataToolBar;
