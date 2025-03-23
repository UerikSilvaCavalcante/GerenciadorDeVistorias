import { ReactNode } from "react";

export default function Field({
  children,
  legend,
}: {
  children: ReactNode;
  legend: string;
}) {
  return (
    <fieldset className="w-full flex flex-col gap-2 border-2 rounded border-blue-700 p-2">
      <legend style={{ color: "blue" }}>{legend}</legend>

      {children}
    </fieldset>
  );
}
