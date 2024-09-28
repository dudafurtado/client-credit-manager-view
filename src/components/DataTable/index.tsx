'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import DeleteIcon from '@/assets/delete-card.png';
import { deleteCard } from '@/services/cardService';
import { useParams } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { getToken } from '@/utils/token';
import useMyContext from '@/context/useMyContext';

export type Card = {
  id: string;
  CVV: number;
  number: string;
  expire_date: string;
};

export function DataTable({ data }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const params = useParams();
  const { toast } = useToast();
  const token = getToken();
  const { reloadClient, setReloadClient } = useMyContext();

  async function handleDeleteCard(cardId: number) {
    const { ok, message } = await deleteCard(token, Number(params.id), cardId);

    if (!ok) {
      return toast(message);
    }

    toast(message);
    setReloadClient(!reloadClient);
    return;
  }

  const columns: ColumnDef<Card>[] = [
    {
      accessorKey: 'number',
      header: 'Número',
      cell: ({ row }) => <div className="capitalize">{row.getValue('number')}</div>,
    },
    {
      accessorKey: 'expire_date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Data de Expiração
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase flex justify-center">{row.getValue('expire_date')}</div>
      ),
    },
    {
      accessorKey: 'CVV',
      header: () => <div>CVV</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue('CVV')}</div>;
      },
    },
    {
      id: 'delete',
      // enableHiding: false,
      header: () => <div className="ml-6">Excluir</div>,
      cell: ({ row }) => {
        return (
          <section className="flex justify-center ml-6">
            <Image
              src={DeleteIcon}
              alt="Icone de uma lixeira representando a exclusão de um cartão"
              width={30}
              height={30}
              className="cursor-pointer self-center"
              onClick={() => handleDeleteCard(Number(row.original.id))}
            />
          </section>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <h1 className="text-xl font-semibold">Cartões de Crédito</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
