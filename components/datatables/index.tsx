"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import React from "react";
import DataToolBar from "./toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  notData?: string;
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
  hideList?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  notData,
  searchId,
  searchPlaceholder,
  links,
  selectlinks,
  hideList = []
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const initialVisibility: VisibilityState = hideList.reduce(
    (acc, key) => ({ ...acc, [key]: false }),
    {}
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      id: false,
      ...initialVisibility
    });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    //enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const newSelection =
          typeof updater === "function" ? updater(prev) : updater;
        const selectedRowIds = Object.keys(newSelection);
        if (selectedRowIds.length > 0) {
          const lastSelected = selectedRowIds[selectedRowIds.length - 1];
          return { [lastSelected]: true };
        }
        return {};
      });
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  //const columnsf = React.useMemo(() => buildColumns(data), [data]);

  return (
    <div className="overflow-hidden">
      <div>
        <DataToolBar
          table={table}
          searchId={searchId}
          searchPlaceholder={searchPlaceholder}
          selectlinks={selectlinks}
          links={links}
        />
      </div>
      <Table className="border-y">
        <TableHeader className="bg-zinc-600/20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer"
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  table.setRowSelection({ [row.id]: true });
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {notData ? notData : "Pas de resultat"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
