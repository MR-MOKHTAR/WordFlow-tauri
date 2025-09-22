import { Dispatch, SetStateAction, useCallback } from "react";
import MyModal from "./MyModal";
import UnifiedButton from "./Buttons/UnifiedButton";

type DeleteModalProp = {
  onClose: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  title?: string;
};

function DeleteModal({ onClose, onConfirm, title }: DeleteModalProp) {
  const onCloseHandler = useCallback(() => onClose(false), [onClose]);
  return (
    <MyModal contentSize="sm" hasXbtn={false}>
      <h2 className="text-center mb-3 font-semibold">هشدار !</h2>
      <p className="leading-relaxed text-center mb-7">
        {`با حذف ${title}، امکان بازیابی آن وجود نخواهد داشت.`}
        <br />
        <strong> آیا مطمئن هستید که می‌خواهید ادامه دهید؟</strong>
      </p>

      <div className="flex-between gap-x-3">
        <UnifiedButton onClick={onCloseHandler} color="info" variant="outlined">
          <span>انصراف</span>
        </UnifiedButton>
        <UnifiedButton onClick={onConfirm} color="error" variant="outlined">
          <span>حذف</span>
        </UnifiedButton>
      </div>
    </MyModal>
  );
}

export default DeleteModal;
