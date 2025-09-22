import React, { memo, useMemo, useState } from "react";
import { FileNameContext } from "../contexts";

function MainFileName({ children }: { children: React.ReactNode }) {
  const [fileName, setFileName] = useState<string | null>("");

  const contextValue = useMemo(
    () => ({ fileName, setFileName }),
    [fileName, setFileName]
  );

  return (
    <FileNameContext.Provider value={contextValue}>
      {children}
    </FileNameContext.Provider>
  );
}

export default memo(MainFileName);
