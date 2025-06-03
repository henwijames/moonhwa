import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchInput({ className, ...props }) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search manhwa..." className="pl-8" {...props} />
    </div>
  );
}
