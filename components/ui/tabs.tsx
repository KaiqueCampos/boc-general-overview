import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { MergeClasses } from "@/utils/mergeClasses";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef(
  ({ className, ...props }: any, ref: any) => (
    <TabsPrimitive.List
      ref={ref}
      className={MergeClasses(
        "inline-flex h-9 items-center rounded-lg bg-secondary/70 p-1",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef(
  ({ className, ...props }: any, ref: any) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={MergeClasses(
        // base
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium",
        "transition-all duration-200 cursor-pointer",

        // state change
        "text-muted-foreground",

        // state active
        "data-[state=active]:bg-primary/60",
        "data-[state=active]:text-primary-foreground",
        "data-[state=active]:shadow-sm",
        "data-[state=active]:scale-[1.02]",

        // focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",

        className,
      )}
      {...props}
    />
  ),
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef(
  ({ className, ...props }: any, ref: any) => (
    <TabsPrimitive.Content
      ref={ref}
      className={MergeClasses("mt-2 focus-visible:outline-none", className)}
      {...props}
    />
  ),
);
TabsContent.displayName = "TabsContent";
