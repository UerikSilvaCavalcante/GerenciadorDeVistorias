import MainLayout from "../components/mainLayout";
import MesageLayout from "../components/mesageLayout";
import getMesagens from "../data/getMensagens";

export default async function Home() {
  const response = await getMesagens();
  return (
    <MainLayout id="home" width="w-[60%]">
      <h1 className="text-zinc-950 text-center w-full p-0 text-4xl font-bold ">
        Mensagens
      </h1>
      <div className="flex flex-col justify-center items-center h-full w-full gap-5">
        {response.map((item, index) => (
          <MesageLayout
            key={index}
            status={item.status}
            name={item.name}
            message={item.message}
          />
        ))}
      </div>
    </MainLayout>
  );
}
