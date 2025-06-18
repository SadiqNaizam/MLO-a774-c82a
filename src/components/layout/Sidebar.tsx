import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // For conditional class names

// Define props for the Sidebar
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // Children will typically be navigation links or other sidebar content
  children?: React.ReactNode;
  // Optional title for the sidebar section
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className, children, title, ...props }) => {
  console.log("Rendering Sidebar component");

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col h-full w-60 lg:w-64 border-r bg-muted/40 p-4 space-y-4",
        className
      )}
      {...props}
    >
      {title && (
        <h2 className="text-lg font-semibold tracking-tight px-2">
          {title}
        </h2>
      )}
      <ScrollArea className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 px-2 text-sm font-medium">
          {children ? children : (
            <p className="text-muted-foreground">
              Sidebar content goes here.
            </p>
          )}
          {/* Example of how links might be added:
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          >
            Orders
          </Link>
          */}
        </nav>
      </ScrollArea>
      {/* You can add a footer to the sidebar here if needed */}
    </aside>
  );
}

export default Sidebar;