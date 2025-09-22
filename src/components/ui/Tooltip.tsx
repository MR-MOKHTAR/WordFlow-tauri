import {
  ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  Placement,
} from "@floating-ui/react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: Placement;
  delay?: number;
  className?: string;
}

const Tooltip = ({
  children,
  content,
  position = "bottom",
  delay = 300,
  className = "",
}: TooltipProps) => {
  const [show, setShow] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const { x, y, strategy, refs, placement } = useFloating({
    placement: position,
    middleware: [offset(8), flip(), shift()],
  });

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => setShow(true), delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  }, []);

  // هر Tooltip مستقل است، reference را روی trigger خود تنظیم می‌کنیم
  useEffect(() => {
    if (triggerRef.current) refs.setReference(triggerRef.current);
  }, [refs]);

  const isVisible = show;

  const tooltipNode = useMemo(() => {
    if (!isVisible) return null;
    return (
      <div
        ref={refs.setFloating}
        style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
        data-floating-placement={placement}
        className={`z-[9999] px-3 py-1.5 rounded-md text-sm 
        text-stone-900 dark:text-[#f8f8f2] 
        backdrop-blur-sm bg-white/80 dark:bg-[#2a2c38]/80
        border border-gray-300 dark:border-[#44475A] 
        shadow-md text-nowrap ${className}`}
      >
        {content}
      </div>
    );
  }, [isVisible, content, strategy, x, y, placement, className, refs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      {children}
      {isVisible && createPortal(tooltipNode, document.body)}
    </div>
  );
};

export default memo(Tooltip);
