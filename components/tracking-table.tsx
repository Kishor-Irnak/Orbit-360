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
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  getCoreRowModel,
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
import {
  ArrowUpDown,
  ChevronDown,
  GripVertical,
  MoreHorizontal,
  Package,
  Search,
} from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const trackingSchema = z.object({
  id: z.string(),
  trackingNumber: z.string(),
  carrier: z.string(),
  origin: z.string(),
  destination: z.string(),
  status: z.string(),
  estimatedDelivery: z.string(),
  lastUpdate: z.string(),
  currentLocation: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<z.infer<typeof trackingSchema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("trackingNumber")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "carrier",
    header: "Carrier",
    cell: ({ row }) => <div>{row.getValue("carrier")}</div>,
  },
  {
    accessorKey: "origin",
    header: "Origin",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("origin")}</div>
    ),
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("destination")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "Delivered"
              ? "default"
              : status === "Out for Delivery"
                ? "secondary"
                : status === "In Transit"
                  ? "outline"
                  : status === "Delayed"
                    ? "destructive"
                    : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "currentLocation",
    header: "Current Location",
    cell: ({ row }) => <div>{row.getValue("currentLocation")}</div>,
  },
  {
    accessorKey: "estimatedDelivery",
    header: () => <div>Est. Delivery</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("estimatedDelivery"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Update status</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof trackingSchema>> }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function TrackingTable({
  data: initialData,
}: {
  data: z.infer<typeof trackingSchema>[];
}) {
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("all");
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

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
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Filter data based on active tab
  function handleTabChange(value: string) {
    setActiveTab(value);
    if (value === "all") {
      table.getColumn("status")?.setFilterValue(undefined);
    } else {
      const statusMap: Record<string, string> = {
        transit: "In Transit",
        delivered: "Delivered",
        delayed: "Delayed",
      };
      table.getColumn("status")?.setFilterValue(statusMap[value]);
    }
  }

  return (
    <div className="w-full px-6">
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tracking numbers..."
              value={
                (table
                  .getColumn("trackingNumber")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("trackingNumber")
                  ?.setFilterValue(event.target.value)
              }
              className="pl-8"
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All Shipments</TabsTrigger>
          <TabsTrigger value="transit">In Transit</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="delayed">Delayed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-md border">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
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
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext
                items={data.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows?.length ? (
                  table
                    .getRowModel()
                    .rows.map((row) => <DraggableRow key={row.id} row={row} />)
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No shipments found.
                    </TableCell>
                  </TableRow>
                )}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {isMobile && (
        <div className="mt-4 space-y-4">
          {table.getRowModel().rows.map((row) => (
            <TableCellViewer key={row.id} item={row.original} />
          ))}
        </div>
      )}
    </div>
  );
}

function TableCellViewer({ item }: { item: z.infer<typeof trackingSchema> }) {
  const date = new Date(item.estimatedDelivery);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="rounded-lg border bg-card p-4 cursor-pointer hover:bg-accent transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{item.trackingNumber}</div>
                <div className="text-sm text-muted-foreground">
                  {item.carrier}
                </div>
              </div>
            </div>
            <Badge
              variant={
                item.status === "Delivered"
                  ? "default"
                  : item.status === "Out for Delivery"
                    ? "secondary"
                    : item.status === "In Transit"
                      ? "outline"
                      : item.status === "Delayed"
                        ? "destructive"
                        : "outline"
              }
            >
              {item.status}
            </Badge>
          </div>
          <div className="mt-2 text-sm">
            <div className="text-muted-foreground">
              {item.origin} → {item.destination}
            </div>
            <div className="mt-1">Current: {item.currentLocation}</div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shipment Details</DrawerTitle>
          <DrawerDescription>
            Tracking Number: {item.trackingNumber}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div>
            <div className="text-sm font-medium">Carrier</div>
            <div className="text-sm text-muted-foreground">{item.carrier}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Status</div>
            <div className="mt-1">
              <Badge
                variant={
                  item.status === "Delivered"
                    ? "default"
                    : item.status === "Out for Delivery"
                      ? "secondary"
                      : item.status === "In Transit"
                        ? "outline"
                        : item.status === "Delayed"
                          ? "destructive"
                          : "outline"
                }
              >
                {item.status}
              </Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Route</div>
            <div className="text-sm text-muted-foreground">
              {item.origin} → {item.destination}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Current Location</div>
            <div className="text-sm text-muted-foreground">
              {item.currentLocation}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Estimated Delivery</div>
            <div className="text-sm text-muted-foreground">
              {date.toLocaleDateString()}
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
