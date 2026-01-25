import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-10 text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
}
