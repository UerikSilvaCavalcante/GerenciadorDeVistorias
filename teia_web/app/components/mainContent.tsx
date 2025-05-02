export default function MainContent({
  children,
  width = "w-full",
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <div className="flex flex-col py-8 px-2 w-full h-full justify-start items-center ">
      <div
        className={`flex flex-col bg-zinc-50 drop-shadow-2xl shadow-2xl rounded-lg justify-center items-center gap-9  p-4 w-[80%] ${width}`}
      >
        {children}
      </div>
    </div>
  );
}
