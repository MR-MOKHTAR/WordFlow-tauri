import { useState, useEffect, useCallback } from "react";

export function useViewportHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return height;
}
