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
      className={clsx(className, "editor-scrollbar")}
    />
  );
});

BaseScroller.displayName = "BaseScroller";

const Scroller = React.memo(BaseScroller) as Components["Scroller"];

export default Scroller;
