import { ReactNode, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import {
  useFloating,
  offset,
  flip,
  shift,
  type ReferenceType,
} from "@floating-ui/react";
import { isRTL } from "../i18next/i18n";

export type MenuItem = {
  label: string;
  action: () => void;
  icon?: ReactNode;
  danger?: boolean;
};

type ContextMenuProps = {
  anchorEl: HTMLElement | null;
  /** When provided (right-click), the menu opens at this screen position. */
  anchorPosition?: { x: number; y: number } | null;
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
};

export default function ContextMenu({
  anchorEl,
  anchorPosition,
  open,
  onClose,
  items,
}: ContextMenuProps) {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.language);

  // جهت بازشدن بر اساس زبان ثابت است: LTR → سمت راست، RTL → سمت چپ.
  // فقط در صورت نبود فضای عمودی، بالا/پایین flip می‌شود (نه چپ/راست).
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [
      offset(4),
      flip({ fallbackAxisSideDirection: "none" }),
      shift({ padding: 8 }),
    ],
  });

  // A virtual reference at the cursor for right-click menus.
  const virtualRef = useMemo<ReferenceType | null>(() => {
    if (!anchorPosition) return null;
    const { x, y } = anchorPosition;
    return {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x,
        y,
        top: y,
        left: x,
        right: x,
        bottom: y,
      }),
    };
  }, [anchorPosition]);

  useEffect(() => {
    if (virtualRef) refs.setReference(virtualRef);
    else if (anchorEl) refs.setReference(anchorEl);
  }, [virtualRef, anchorEl, refs]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        refs.floating.current &&
        !refs.floating.current.contains(e.target as Node) &&
        (!anchorEl || !anchorEl.contains(e.target as Node))
      ) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, anchorEl, refs, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={refs.setFloating}
      dir={rtl ? "rtl" : "ltr"}
      style={floatingStyles}
      className="z-[9999] min-w-44 p-1 rounded-xl border shadow-xl bg-context-light dark:bg-context-dark border-border-light dark:border-white/10 text-header-light dark:text-header-dark"
    >
      <ul className="text-sm">
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => {
                item.action();
                onClose();
              }}
              className={`flex w-full items-center gap-2.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                item.danger
                  ? "text-red-600 dark:text-red-400 hover:bg-red-500/10"
                  : "hover:bg-hover-light dark:hover:bg-hover-dark"
              }`}
            >
              {item.icon && (
                <span className="text-base shrink-0 opacity-80">
                  {item.icon}
                </span>
              )}
              <span className="truncate">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );
}
