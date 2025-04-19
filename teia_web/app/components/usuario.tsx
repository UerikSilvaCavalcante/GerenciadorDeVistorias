import { useContext } from "react";
import { AuthContext } from "../actions/valid";

export default function Usuario() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center border-r-zinc-50 border-solid border-r-2 px-4">
      <p className="font-bold text-zinc-50">Olá, {user?.userName}</p>
    </div>
  );
}
