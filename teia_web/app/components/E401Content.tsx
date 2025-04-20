"server client";


import { VistoriaProps } from "../@types/vistoriaTypes";
import { TipoImovel } from "../enums/vistoria";
import getImovel from "../data/getImovel";
import { RowContent } from "./UI/rowContent";
import { ColumnContent } from "./UI/columnContent";
import { ObraProps } from "../@types/obraTypes";

export default async function E401Content({
  vistoria,
  token,
}: {
  vistoria: VistoriaProps;
  token: string;
}) {
  let Imovel = null;
  console.log(vistoria);
  if (vistoria.endereco.tipoImovel == TipoImovel.Obra) {
    Imovel = await getImovel(
      vistoria.idTipoImovel as number,
      vistoria.endereco.tipoImovel,
      token
    );
    Imovel = Imovel as ObraProps;
  }
  console.log(Imovel);
  return (
    <div className="flex flex-col px-4 h-full w-full">
      <RowContent>
        <ColumnContent>
          <h1 className="text-lg font-bold text-zin-900">Serviços</h1>
        </ColumnContent>
      </RowContent>
      <RowContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-between">
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Serviços Preliminares e gerais</span>
              {Imovel?.servico}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Infraestrutura</span>
              {Imovel?.infraestrutura}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Supra-estrutura</span>
              {Imovel?.supraEstrutura}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Paredes e painéis</span>  
              {Imovel?.paredes}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Esquadrias</span>  
              {Imovel?.esquadrias}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Coberturas</span>  
              {Imovel?.cobertura}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Impermeabilizações</span>  
              {Imovel?.impermeabilizacao}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Revestimentos Internos</span>  
              {Imovel?.revestimentosInternos}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Forros</span>  
              {Imovel?.forros}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-start">
          <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Revestimentos externos</span>
              {Imovel?.revestimentosExternos}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Pintura</span>
              {Imovel?.pinturas}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Pisos</span>
              {Imovel?.pisos}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Acabamentos</span>  
              {Imovel?.acabamentos}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Inst. elétricas e telefônicas</span>  
              {Imovel?.instalacoesEletricas}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Inst. esgoto e águas pluviais</span>  
              {Imovel?.instalacoesEsgoto}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Louças e metais</span>  
              {Imovel?.loucasMetais}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Complementos</span>  
              {Imovel?.complementos}
            </p>
            <p className="text-sm w-full flex justify-between">
              <span className="font-bold">Outros serviços</span>  
              {Imovel?.outros}
            </p>
          </div>
        </ColumnContent>
      </RowContent>
    </div>
  );
}
