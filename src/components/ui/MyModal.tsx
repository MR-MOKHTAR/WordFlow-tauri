import { memo, MouseEvent, ReactNode, useCallback } from "react";
import { MdOutlineClose } from "react-icons/md";
import ButtonWithIcon from "./Buttons/ButtonWithIcon";

type ModalProps = {
  children: ReactNode;
  contentSize?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl";
  onClose?: () => void;
  hasXbtn?: boolean;
};

const sizeValues: Record<NonNullable<ModalProps["contentSize"]>, number> = {
  xs: 320, // max-w-xs
  sm: 384, // max-w-sm
  md: 448, // max-w-md
  lg: 512, // max-w-lg
  xl: 578,
  "2xl": 672,
  "3xl": 768,
  "4xl": 896,
  "5xl": 1024,
};

const MyModal = memo(function MyModal({
  children,
  contentSize = "sm",
  onClose,
  hasXbtn = true,
}: ModalProps) {
  const clickHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    []
  );
  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // بستن وقتی روی overlay کلیک شد
    >
      <div
        className={`modal-content`}
        style={{ maxWidth: `${sizeValues[contentSize]}px` }}
        onClick={clickHandler} // جلوگیری از بستن هنگام کلیک روی محتوا
      >
        {children}

        {hasXbtn && onClose && (
          <div className="absolute -top-2.5 -right-2.5 z-50">
            <ButtonWithIcon
              onClick={onClose}
              shape="full"
              icon={<MdOutlineClose size={18} />}
              className="bg-gray-300/50 hover:bg-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default memo(MyModal);
