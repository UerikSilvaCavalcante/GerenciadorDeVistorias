export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div className="flex flex-col items-center">
        <svg viewBox="25 25 50 50" className="svgCircle">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  );
}
