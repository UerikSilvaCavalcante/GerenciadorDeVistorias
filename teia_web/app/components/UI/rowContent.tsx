import { ReactNode } from "react";

export const RowContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start justify-start h-full w-full p-4 border-y-2 border-indigo-900 flex-wrap md:flex-nowrap">
      {children}
    </div>
  );
};
