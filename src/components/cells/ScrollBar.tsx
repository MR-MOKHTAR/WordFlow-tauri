import React from "react";
import clsx from "clsx";
import { Components } from "react-virtuoso";

const BaseScroller = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        className,
        "editor-scrollbar scrollbar scrollbar-thumb-rounded scrollbar-track-rounded",
        "scrollbar-track-gray-700 dark:scrollbar-track-gray-900",
        "scrollbar-thumb-green-600/80 dark:scrollbar-thumb-cyan-700/90",
        "hover:scrollbar-thumb-green-500/90 dark:hover:scrollbar-thumb-cyan-600"
      )}
    />
  );
});

BaseScroller.displayName = "BaseScroller";

const Scroller = React.memo(BaseScroller) as Components["Scroller"];

export default Scroller;
