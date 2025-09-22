import { ReactNode, useMemo, useState } from "react";
import { RemoveCellContext } from "../contexts";

type PropType = {
  children: ReactNode;
};
export default function RemoveCellProvider({ children }: PropType) {
  const [openRemoveCellModal, setOpenRemoveCellModal] = useState(false);
  const [CellID, setCellID] = useState<string | null>(null);

  const contextValue = useMemo(
    () => ({ openRemoveCellModal, setOpenRemoveCellModal, CellID, setCellID }),
    [CellID, openRemoveCellModal]
  );

  return (
    <RemoveCellContext.Provider value={contextValue}>
      {children}
    </RemoveCellContext.Provider>
  );
}
