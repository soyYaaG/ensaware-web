"use client";

import { Load } from "@/components/load";
import {
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Input,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { useAuthContext } from "@/contexts/authContext";
import { user } from "@/entities";
import { useUsers } from "@/hooks/useUsers";
import { getDate } from "@/lib";
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
} from "@tanstack/react-table";
import { ArrowUpDown, Copy, MoreHorizontal, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Users() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const { authPermission, authUser, isLoad } = useAuthContext();
	const { next, pagination, prev, remove, users: data } = useUsers();

	const columns: ColumnDef<user>[] = [
		{
			accessorKey: "id",
			header: "ID",
			cell: ({ row }) => {
				return <div>{(row.getValue("id") as string).substring(0, 8)}</div>;
			},
		},
		{
			accessorKey: "display_name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Nombre
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue("display_name")}</div>,
		},
		{
			accessorKey: "email",
			header: "Correo electrónico",
			cell: ({ row }) => {
				return <div>{row.getValue("email")}</div>;
			},
		},
		{
			accessorKey: "career",
			header: "Carrera",
			cell: ({ row }) => {
				return <div>{row.original.career?.name || ""}</div>;
			},
		},
		{
			accessorKey: "profile",
			header: "Perfil",
			cell: ({ row }) => {
				return <div>{row.original.profile?.name || ""}</div>;
			},
		},
		{
			accessorKey: "created",
			header: "Fecha Creación",
			cell: ({ row }) => {
				return (
					<div>
						{getDate({
							date: row.getValue("created"),
							lang: "es",
						})}
					</div>
				);
			},
		},
		{
			accessorKey: "modified",
			header: "Fecha Actualización",
			cell: ({ row }) => (
				<div>
					{getDate({
						date: row.getValue("modified"),
						lang: "es",
					})}
				</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const data = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Acciones</DropdownMenuLabel>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => navigator.clipboard.writeText(data.display_name)}
							>
								<Copy className="h-4 w-4 mr-2" />
								Copiar nombre
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							{authPermission &&
								authPermission["user:update"] &&
								data.id !== authUser?.id && (
									<Link href={`/app/users/${data.id}`}>
										<DropdownMenuItem className="cursor-pointer">
											<Pen className="h-4 w-4 mr-2 text-blue-700" />
											Editar
										</DropdownMenuItem>
									</Link>
								)}
							{authPermission &&
								authPermission["user:delete"] &&
								data.id !== authUser?.id && (
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={() => remove(data.id)}
									>
										<Trash className="h-4 w-4 mr-2 text-red-700" />
										Eliminar
									</DropdownMenuItem>
								)}
						</DropdownMenuContent>
					</DropdownMenu>
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
		<>
			{isLoad && <Load />}
			<div className="w-full">
				<div className="flex items-center py-4">
					<Input
						placeholder="Buscar Usuario..."
						value={
							(table.getColumn("display_name")?.getFilterValue() as string) ??
							""
						}
						onChange={(event) =>
							table
								.getColumn("display_name")
								?.setFilterValue(event.target.value)
						}
						className="w-full"
						id="searchCareer"
					/>
					<DropdownMenu>
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
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
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
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										Sin resultado.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-center space-x-2 py-4">
					<div className="flex-1 text-sm text-muted-foreground">
						<p>
							Pagina {pagination?.page} de {pagination?.pages}
						</p>
						<p className="mt-2">Total registro(s): {pagination?.total}</p>
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							disabled={!pagination?.links.prev}
							onClick={prev}
						>
							Anterior
						</Button>
						<Button
							variant="outline"
							size="sm"
							disabled={!pagination?.links?.next}
							onClick={next}
						>
							Siguiente
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
