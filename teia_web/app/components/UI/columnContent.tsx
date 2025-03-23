import { ReactNode } from "react";

export const ColumnContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-start justify-start px-3 h-full w-full border-x-2 border-indigo-900  text-zinc-950 text-nowrap gap-2">
      {children}
    </div>
  );
};
