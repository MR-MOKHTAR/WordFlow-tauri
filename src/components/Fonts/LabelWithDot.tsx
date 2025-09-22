import { memo } from "react";

type Props = {
  htmlFor: string;
  children: React.ReactNode;
};

function LabelWithDot({ htmlFor, children }: Props) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-x-2 mb-2">
      <span className="font-bold text-base text-gray-700 dark:text-gray-200 text-nowrap">
        {children}
      </span>
    </label>
  );
}

export default memo(LabelWithDot);
