"use server";

interface MensagemProps {
  status: boolean;
  name: string;
  message?: string;
}

async function getMesagens():Promise<MensagemProps[]> {
  const message: MensagemProps[] = [{status: true, name: "Mensagem 1", message: "Mensagem 1"}, {status: false, name: "Mensagem 2", message: "Mensagem 2"}];

  return new Promise<MensagemProps[]>((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, 3000);
  });
}

export default getMesagens;