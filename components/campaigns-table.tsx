"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconBox,
  IconAlertTriangle,
  IconX,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Reusing schema but interpreting fields differently for campaigns
export const campaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(), // Description | ROAS | CTR
  price: z.string(), // Spend/CPC
  stock: z.number(), // Purchases/Conversions
  status: z.string(), // Status
  image: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<z.infer<typeof campaignSchema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Preview",
    cell: ({ row }) => (
      <div className="size-10 rounded-md overflow-hidden border bg-muted">
        <img
          src={row.original.image}
          alt={row.original.name}
          className="size-full object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Campaign Name",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    id: "objective",
    header: "Objective",
    cell: ({ row }) => {
      // Extract the description part (before the first pipe)
      const description = row.original.category.split("|")[0].trim();
      return (
        <div
          className="text-muted-foreground text-sm max-w-[200px] truncate"
          title={description}
        >
          {description}
        </div>
      );
    },
  },
  {
    id: "roas",
    header: () => <div className="text-right">ROAS</div>,
    cell: ({ row }) => {
      // Parse "ROAS: 4.12x" -> "4.12x"
      const roas =
        row.original.category
          .split("|")
          .find((p) => p.includes("ROAS"))
          ?.split(":")[1]
          ?.trim() ?? "-";
      return <div className="text-right font-medium tabular-nums">{roas}</div>;
    },
  },
  {
    id: "ctr",
    header: () => <div className="text-right">CTR</div>,
    cell: ({ row }) => {
      // Parse "CTR: 1.8%" -> "1.8%"
      const ctr =
        row.original.category
          .split("|")
          .find((p) => p.includes("CTR"))
          ?.split(":")[1]
          ?.trim() ?? "-";
      return (
        <div className="text-muted-foreground text-right tabular-nums">
          {ctr}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Spend</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.original.price}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-right">Purchases</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums text-muted-foreground">
        {row.original.stock}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "text-muted-foreground";
      let icon = <IconLoader className="size-3" />;
      let displayStatus = status;

      // Mapping status to Campaign friendly terms if needed,
      // but sticking to data.json values for now with different visuals
      if (status === "In Stock" || status === "Active") {
        icon = (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 size-3" />
        );
        colorClass = "text-green-600 dark:text-green-400";
        displayStatus = "Active";
      } else if (status === "Low Stock") {
        icon = <IconAlertTriangle className="size-3" />;
        colorClass = "text-yellow-600 dark:text-yellow-400";
        displayStatus = "In Progress";
      } else if (status === "Out of Stock" || status === "Inactive") {
        icon = <IconX className="size-3" />;
        colorClass = "text-red-600 dark:text-red-400";
        displayStatus = "Inactive";
      }

      return (
        <Badge variant="outline" className={`px-1.5 gap-1 ${colorClass}`}>
          {icon}
          {displayStatus}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Performance</DropdownMenuItem>
          <DropdownMenuItem>Edit Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Turn Off</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof campaignSchema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function CampaignsTable({
  data: initialData,
}: {
  data: z.infer<typeof campaignSchema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const filteredData = React.useMemo(() => {
    if (filterStatus === "all") return data;
    return data.filter((item) => {
      const status = item.status;
      if (filterStatus === "active")
        return status === "In Stock" || status === "Active";
      if (filterStatus === "inactive")
        return status === "Out of Stock" || status === "Inactive";
      if (filterStatus === "inprogress") return status === "Low Stock";
      return true;
    });
  }, [data, filterStatus]);

  const activeCount = data.filter(
    (i) => i.status === "In Stock" || i.status === "Active"
  ).length;
  const inactiveCount = data.filter(
    (i) => i.status === "Out of Stock" || i.status === "Inactive"
  ).length;
  const inprogressCount = data.filter((i) => i.status === "Low Stock").length;

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => filteredData?.map(({ id }) => id) || [],
    [filteredData]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      value={filterStatus}
      onValueChange={setFilterStatus}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">
            Active <Badge variant="secondary">{activeCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive <Badge variant="secondary">{inactiveCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Columns</span>
                <span className="lg:hidden">Cols</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  let label = column.id;
                  switch (column.id) {
                    case "price":
                      label = "Spend";
                      break;
                    case "stock":
                      label = "Purchases";
                      break;
                    case "roas":
                      label = "ROAS";
                      break;
                    case "ctr":
                      label = "CTR";
                      break;
                    case "status":
                      label = "Status";
                      break;
                    case "objective":
                      label = "Objective";
                      break;
                    case "image":
                      label = "Image";
                      break;
                    default:
                      label =
                        column.id.charAt(0).toUpperCase() + column.id.slice(1);
                  }

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
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
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No campaigns found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Tabs>
  );
}

function TableCellViewer({ item }: { item: z.infer<typeof campaignSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground w-fit px-0 text-left font-medium"
        >
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>Campaign Details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm mb-4">
          <div className="flex items-center gap-4">
            <div className="size-20 rounded-lg overflow-hidden border bg-muted shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold">
                {item.price}{" "}
                <span className="text-muted-foreground text-sm font-normal">
                  spent
                </span>
              </div>
              <div className="text-muted-foreground">ID: {item.id}</div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Performance Metrics</div>
            <p className="text-muted-foreground">{item.category}</p>
            <div className="flex gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Purchases</span>
                <span className="font-medium">{item.stock}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Status</span>
                <span className="font-medium">{item.status}</span>
              </div>
            </div>
          </div>
          <Separator />
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="budget">Daily Budget</Label>
                <Input id="budget" type="number" defaultValue={5000} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Campaign Status</Label>
                <Select
                  defaultValue={
                    item.status === "In Stock" ? "Active" : "Paused"
                  }
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
          <Separator />
          <div className="text-muted-foreground text-xs">
            Last updated: 15 mins ago
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
