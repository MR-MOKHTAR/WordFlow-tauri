import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift } from "@floating-ui/react";

export type MenuItem = {
  label: string;
  action: () => void;
};

type ContextMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
};

export default function ContextMenu({
  anchorEl,
  open,
  onClose,
  items,
}: ContextMenuProps) {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [offset(4), flip(), shift()],
  });

  useEffect(() => {
    if (anchorEl) refs.setReference(anchorEl);
  }, [anchorEl, refs]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        refs.floating.current &&
        !refs.floating.current.contains(e.target as Node) &&
        anchorEl &&
        !anchorEl.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, anchorEl, refs, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className="z-[9999] w-40 rounded-lg border shadow-lg bg-context-light dark:bg-context-dark border-context-light dark:border-context-dark text-header-light dark:text-header-dark"
    >
      <ul className="text-sm">
        {items.map((item, i) => (
          <li
            key={i}
            className="px-3 py-2 hover:bg-hover-light dark:hover:bg-hover-dark cursor-pointer"
            onClick={() => {
              item.action();
              onClose();
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}
