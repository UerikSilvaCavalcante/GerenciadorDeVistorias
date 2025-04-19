import { ReactNode } from "react";

export const RowContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start justify-start w-full p-4 border-y-2 border-indigo-900 h-full ">
      {children}
    </div>
  );
};