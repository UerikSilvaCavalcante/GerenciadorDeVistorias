// components/PdfDocumento.tsx

"use server";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

import { Status, Tipo, TipoImovel } from "@/app/enums/vistoria";
import {
  TipoMuro,
  TipoEstadoConservacao,
  TipoJanela,
  TipoBancada,
  TipoPadrao,
  TipoPiso,
  Estilo,
  tipoPintura,
  TipoMaterial,
  TipoLocal,
  TipoRevestimento,
  TipoTeto,
  TipoLoc,
} from "@/app/enums/acabamento";
import {
  TipoAreaServico,
  TipoBanheiro,
  TipoGaragem,
} from "@/app/enums/divisao";
import {
  CotaGreide,
  Telhado,
  TipoArea,
  TipoDoImovelEnum,
} from "@/app/enums/imovel";
import {
  TipoAcabamento,
  TipoFormato,
  TipoLote,
  TipoSituacao,
  TipoSolucao,
  TipoTopografia,
  TipoUsoPredominante,
} from "@/app/enums/lote";
import { TipoPosicao, TipoVista } from "@/app/enums/apartamento";
import { VistoriaProps } from "@/app/@types/vistoriaTypes";
import { LoteProps } from "@/app/@types/loteTypes";
import { ObraProps } from "@/app/@types/obraTypes";
import getVistoriaById from "../data/getVistoriaById";
import getImovel from "../data/getImovel";
import { ApartamentoProps } from "../@types/apartamentoTypes";

// Estilos gerais
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10, fontFamily: "Helvetica" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 5,
  },
  title: { fontSize: 14, fontWeight: "bold" },
  sectionRow: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#999",
    paddingVertical: 5,
  },
  column: { flex: 1, paddingHorizontal: 5 },
  label: { fontWeight: "bold" },
  subsection: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 2,
    borderColor: "#999",
  },
});

interface getVistoriaProps {
  id: number;
  type: number;
  idVistoria: number;
  token: string;
}

const E401Content = ({ Imovel }: { Imovel: ObraProps }) => {
  return (
    <View>
      <View style={styles.subsection}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
          Detalhes Obra (E401):
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "3px",
              borderRightWidth: 1,
              width: "100%",
              paddingRight: 5,
              paddingLeft: 5,
              borderRightColor: "#999",
            }}
          >
            <Text>
              <Text style={styles.label}>Serviços Preliminares e gerais:</Text>{" "}
              {Imovel?.servico}
            </Text>
            <Text>
              <Text style={styles.label}>Infraestrutura:</Text>{" "}
              {Imovel?.infraestrutura}
            </Text>
            <Text>
              <Text style={styles.label}>Supra-estrutura:</Text>{" "}
              {Imovel?.supraEstrutura}
            </Text>
            <Text>
              <Text style={styles.label}>Paredes e painéis:</Text>{" "}
              {Imovel?.paredes}
            </Text>
            <Text>
              <Text style={styles.label}>Esquadrias:</Text> {Imovel?.esquadrias}
            </Text>
            <Text>
              <Text style={styles.label}>Coberturas:</Text> {Imovel?.cobertura}
            </Text>
            <Text>
              <Text style={styles.label}>Revestimentos Internos:</Text>{" "}
              {Imovel?.revestimentosInternos}
            </Text>
            <Text>
              <Text style={styles.label}>Forros:</Text> {Imovel?.forros}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "3px",
              borderRightWidth: 1,
              width: "100%",
              paddingRight: 5,
              paddingLeft: 5,
              borderRightColor: "#999",
            }}
          >
            <Text>
              <Text style={styles.label}>Revestimentos externos:</Text>{" "}
              {Imovel?.revestimentosExternos}
            </Text>
            <Text>
              <Text style={styles.label}>Pintura:</Text> {Imovel?.pinturas}
            </Text>
            <Text>
              <Text style={styles.label}>Pisos:</Text> {Imovel?.pisos}
            </Text>
            <Text>
              <Text style={styles.label}>Acabamentos:</Text>{" "}
              {Imovel?.acabamentos}
            </Text>
            <Text>
              <Text style={styles.label}>Inst. elétricas e telefônicas:</Text>{" "}
              {Imovel?.instalacoesEletricas}
            </Text>
            <Text>
              <Text style={styles.label}>Inst. esgoto e águas pluviais:</Text>{" "}
              {Imovel?.instalacoesEsgoto}
            </Text>
            <Text>
              <Text style={styles.label}>Louças e metais:</Text>{" "}
              {Imovel?.loucasMetais}
            </Text>
            <Text>
              <Text style={styles.label}>Complementos:</Text>{" "}
              {Imovel?.complementos}
            </Text>
            <Text>
              <Text style={styles.label}>Outros serviços:</Text>{" "}
              {Imovel?.outros}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const B438Content = ({ Imovel }: { Imovel: LoteProps }) => {
  return (
    <View>
      <View style={styles.subsection}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
          Detalhes Lote (B438/B437):
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text>
              <Text style={styles.label}>Area do Terreno:</Text>{" "}
              {Imovel?.areaTerreno} m²
            </Text>
            <Text>
              <Text style={styles.label}>Tipo de Terreno:</Text>{" "}
              {TipoLote[Imovel?.tipo as number]}
            </Text>
            <Text>
              <Text style={styles.label}>Formato do Terreno:</Text>{" "}
              {TipoFormato[Imovel?.formato as number]}
            </Text>
            <Text>
              <Text style={styles.label}>Situação:</Text>{" "}
              {TipoSituacao[Imovel?.situacao as number]}
            </Text>
            <Text>
              <Text style={styles.label}>Topografia:</Text>{" "}
              {TipoTopografia[Imovel?.topografia as number]}
            </Text>
            <Text>
              <Text style={styles.label}>Localização da Unidade:</Text>{" "}
              {Imovel?.localizacaoUnidade}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text>
              <Text style={styles.label}>Frente:</Text> {Imovel?.frente} m²
            </Text>
            <Text>
              <Text style={styles.label}>Uso Predominante:</Text>{" "}
              {TipoUsoPredominante[Imovel?.usoPredio as number]}
            </Text>
            <Text>
              <Text style={styles.label}>Padrão Usual de Acabamento:</Text>{" "}
              {TipoAcabamento[Imovel?.acabamento as number]}
            </Text>
            <Text>
              <Text style={styles.label}>Avaliação da Localização:</Text> Boa
            </Text>
            <Text>
              <Text style={styles.label}>Densidade de Ocupação:</Text>{" "}
              {Imovel?.densidade}
            </Text>
            <Text>
              <Text style={styles.label}>Transporte Coletivo:</Text>{" "}
              {Imovel?.transportePublico ? "Satisfatorio" : "Não disponivel"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.subsection}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
          Soluções de infra-estrutura disponíveis junto à unidade, serviços e
          equipamentos comunitários no entorno:
        </Text>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Água:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.agua as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Esgoto:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.esgoto as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Energia elétrica:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.energia as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Iluminação Pública:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.iluminacao as number]}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Pavimentação:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.pavimentacao as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Águas pluviais:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.agua as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Guias e sarjetas:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.agua as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Abast. de gás:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.absGas as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Coleta de lixo:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.coletaLixo as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Escola:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.escola as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Creche:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.creche as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Saúde Pública:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.saude as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Comércio:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.comercio as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Segurança Pública:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.seguranca as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Lazer:</Text>
            <Text>{TipoSolucao[Imovel?.solucoes.lazer as number]}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const A413Content = ({ vistoria }: { vistoria: VistoriaProps }) => {
  return (
    <View>
      <View style={styles.subsection}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
          Detalhes Imóvel (A413):
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.column}>
            <Text>
              <Text style={styles.label}>Idade:</Text>{" "}
              {vistoria.imovel?.idadeImovel} anos
            </Text>
            <Text>
              <Text style={styles.label}>Valor:</Text> R${" "}
              {vistoria.imovel?.valorImovel}
            </Text>
            <Text>
              <Text style={styles.label}>Área Coberta:</Text>{" "}
              {vistoria.imovel?.areaImovel
                .filter((a) => a.tipoArea === TipoArea.Coberta)
                .map((a) => a.valor)
                .join(", ")}{" "}
              m²
            </Text>
          </View>
          <View style={styles.column}>
            <Text>
              <Text style={styles.label}>Área Externa:</Text>{" "}
              {vistoria.imovel?.areaImovel
                .filter((a) => a.tipoArea === TipoArea.Externa)
                .map((a) => a.valor)
                .join(", ")}{" "}
              m²
            </Text>
            <Text>
              <Text style={styles.label}>Área Terreno:</Text>{" "}
              {vistoria.imovel?.areaImovel
                .filter((a) => a.tipoArea === TipoArea.Terreno)
                .map((a) => a.valor)
                .join(", ")}{" "}
              m²
            </Text>
            <Text>
              <Text style={styles.label}>Frente:</Text>{" "}
              {vistoria.imovel?.frente} m
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.subsection}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            Acabamentos:
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "3px",
                borderRightWidth: 1,
                width: "100%",
                paddingRight: 5,
                paddingLeft: 5,
                borderRightColor: "#999",
              }}
            >
              <Text>
                <Text style={styles.label}>Patologia:</Text>{" "}
                {vistoria.imovel?.patologia}
              </Text>
              <Text>
                <Text style={styles.label}>Tipo Imóvel:</Text>{" "}
                {TipoDoImovelEnum[vistoria.imovel?.tipoDoImovel as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Situação:</Text>{" "}
                {vistoria.imovel?.situacao === TipoSituacao.MeioDeQuadra
                  ? "Meio de Quadra"
                  : "Esquina"}
              </Text>
              <Text>
                <Text style={styles.label}>Cota Greide:</Text>{" "}
                {CotaGreide[vistoria.imovel?.cotaGreide as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Telhado:</Text>{" "}
                {Telhado[vistoria.imovel?.telhado as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Muro:</Text>{" "}
                {TipoMuro[vistoria.imovel?.acabamento?.muro as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Quadro Elétrico:</Text>{" "}
                {vistoria.imovel?.acabamento?.quadroEletrico} Disjuntores
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "3px",
                width: "100%",
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              <Text>
                <Text style={styles.label}>Teto:</Text>{" "}
                {TipoTeto[vistoria.imovel?.acabamento?.teto as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Piso:</Text>{" "}
                {TipoPiso[vistoria.imovel?.acabamento?.piso as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Janelas:</Text>{" "}
                {TipoJanela[vistoria.imovel?.acabamento?.janelas as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Bancada:</Text>{" "}
                {TipoBancada[vistoria.imovel?.acabamento?.bancada as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Padrão:</Text>{" "}
                {TipoPadrao[vistoria.imovel?.acabamento?.padrao as number]}
              </Text>
              <Text>
                <Text style={styles.label}>Estado Conservação:</Text>{" "}
                {
                  TipoEstadoConservacao[
                    vistoria.imovel?.acabamento?.estadoConservacao as number
                  ]
                }
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "3px",
                borderRightWidth: 1,
                width: "100%",
                paddingRight: 5,
                borderRightColor: "#999",
                height: "100%",
                paddingLeft: 5,
              }}
            >
              <Text style={{ marginTop: 4, fontWeight: "bold" }}>
                Pinturas:
              </Text>
              {vistoria.imovel?.acabamento?.pinturas.map((p, i) => (
                <Text key={i}>
                  • {tipoPintura[p.tipoPintura]}: {Estilo[p.estilo]}
                </Text>
              ))}
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "3px",
                borderRightWidth: 1,
                width: "100%",
                paddingRight: 5,
                borderRightColor: "#999",
                paddingLeft: 5,
                height: "100%",
              }}
            >
              <Text style={{ marginTop: 4, fontWeight: "bold" }}>Portas:</Text>
              {vistoria.imovel?.acabamento?.portas.map((d, i) => (
                <Text key={i}>
                  • {TipoLoc[d.loc]}: {TipoMaterial[d.material]}
                </Text>
              ))}
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "3px",

                width: "100%",
                paddingRight: 5,
                paddingLeft: 5,
                height: "100%",
              }}
            >
              <Text style={{ marginTop: 4, fontWeight: "bold" }}>
                Revestimentos:
              </Text>
              {vistoria.imovel?.acabamento?.revestimentos.map((r, i) => (
                <Text key={i}>
                  • {TipoLocal[r.local]}: {TipoRevestimento[r.tipoRevestimento]}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.subsection}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            Infraestruturas:
          </Text>
          <Text>
            {vistoria.imovel?.infraestrutura?.redeAguaP
              ? "Rede de Agua Potável"
              : ""}
          </Text>
          <Text>
            {vistoria.imovel?.infraestrutura?.redeEsgoto
              ? "Rede de Esgoto"
              : ""}
          </Text>
          <Text>
            {vistoria.imovel?.infraestrutura?.iluminacao
              ? "Iluminação Publica"
              : ""}
          </Text>
          <Text>
            {vistoria.imovel?.infraestrutura?.pavimentacao
              ? "Pavimentação"
              : ""}
          </Text>
          <Text>
            {vistoria.imovel?.infraestrutura?.sumidouro ? "Sumidouro" : ""}
          </Text>
          <Text>{vistoria.imovel?.infraestrutura?.fossa ? "Fossa" : ""}</Text>
        </View>
        <View style={styles.subsection}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Divisão:</Text>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Quartos:</Text>
              <Text>{vistoria.imovel?.divisao?.quartos}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Banheiro Social:</Text>
              <Text>
                {vistoria.imovel?.divisao?.banheiros
                  .filter((b) => b.tipoBanheiro === TipoBanheiro.Social)
                  .map((b) => b.qtde)
                  .join(", ")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Banheiro Privado:</Text>
              <Text>
                {vistoria.imovel?.divisao?.banheiros
                  .filter((b) => b.tipoBanheiro === TipoBanheiro.Privado)
                  .map((b) => b.qtde)
                  .join(", ")}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Lavabos:</Text>
              <Text>{vistoria.imovel?.divisao?.lavabos}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Sacadas:</Text>
              <Text>{vistoria.imovel?.divisao?.sacadaVaranda}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Cozinhas:</Text>
              <Text>{vistoria.imovel?.divisao?.cozinhas}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Salas:</Text>
              <Text>{vistoria.imovel?.divisao?.salas}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Garagem Descoberta:</Text>
              <Text>
                {vistoria.imovel?.divisao?.garagems
                  .filter((b) => b.tipoGaragem === TipoGaragem.Descoberta)
                  .map((b) => b.qtde)
                  .join(", ")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Garagem Coberta:</Text>
              <Text>
                {vistoria.imovel?.divisao?.garagems
                  .filter((b) => b.tipoGaragem === TipoGaragem.Coberta)
                  .map((b) => b.qtde)
                  .join(", ")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                • Área de Serviço Coberta:
              </Text>
              <Text>
                {vistoria.imovel?.divisao?.areaServico
                  .filter((b) => b.tipo === TipoAreaServico.Interna)
                  .map((b) => b.qtde)
                  .join(", ")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                • Área de Serviço Descoberta:
              </Text>
              <Text>
                {vistoria.imovel?.divisao?.areaServico
                  .filter((b) => b.tipo === TipoAreaServico.Externa)
                  .map((b) => b.qtde)
                  .join(", ")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Piscina:</Text>
              <Text>{vistoria.imovel?.divisao?.piscina}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>• Outros:</Text>
              <Text>{vistoria.imovel?.divisao?.outros || "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const ApartamentoContent = ({ Imovel }: { Imovel: ApartamentoProps }) => {
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flexDirection: "column", width: "100%" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
          Detalhes do Apartamento:
        </Text>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 5,
            borderRight: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Andar:</Text>
            <Text>{Imovel?.andar}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Posição da Unidade:</Text>
            <Text>{TipoPosicao[Imovel?.posicao_ as number]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Vista Panorãmica:</Text>
            <Text>{TipoVista[Imovel?.vista as number]}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Administrador:</Text>
            <Text>{Imovel?.adminstradora}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Telefone Admin::</Text>
            <Text>{Imovel?.tel_Administradora}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Valor do Condominio:</Text>
            <Text>{Imovel?.condominioVal}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              • Identificação dos Pavimentos:
            </Text>
            <Text>{Imovel?.identificacaoPav}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column", width: "100%" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Bloco:</Text>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Número de Pavimentos:</Text>
            <Text>{Imovel?.blocoPredio?.pavimentos}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              • Quantidade de elevadores:
            </Text>
            <Text>{Imovel?.blocoPredio?.elevadores}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Idade estimada:</Text>
            <Text>{Imovel?.blocoPredio?.idade}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              • N° de apartamentos por andar:
            </Text>
            <Text>{Imovel?.blocoPredio?.aptosPorAndar}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              • N° de unidades no predio::
            </Text>
            <Text>{Imovel?.blocoPredio?.unidadesPredio}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• N° de subsolos:</Text>
            <Text>{Imovel?.blocoPredio?.subsolos}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• N° de blocos:</Text>
            <Text>{Imovel?.blocoPredio?.blocos}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>• Outros:</Text>
            <Text>{Imovel?.blocoPredio?.outros}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Componente principal
export const PdfDocumento = async ({
  id,
  idVistoria,
  token,
  type,
}: {
  id: number;
  idVistoria: number;
  token: string;
  type: number;
}) => {
  const requestProps: getVistoriaProps = {
    id: id,
    type: type,
    idVistoria: idVistoria,
    token: token as string,
  };
  const vistoria: VistoriaProps = await getVistoriaById(requestProps);

  let Imovel = null;
  if (vistoria.status == Status.Concluida) {
    Imovel = await getImovel(
      vistoria.idTipoImovel as number,
      vistoria.endereco.tipoImovel,
      token
    );
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Vistoria de {TipoImovel[vistoria.endereco.tipoImovel]}
          </Text>
          <Text>OS: {vistoria.numOs}</Text>
        </View>

        {/* Seção de informações gerais */}
        <View style={styles.sectionRow}>
          <View style={styles.column}>
            <Text>
              <Text style={styles.label}>Data Abertura:</Text>{" "}
              {new Date(vistoria.dataAbertura).toLocaleDateString("pt-BR")}
            </Text>
            <Text>
              <Text style={styles.label}>Vistoriador:</Text>{" "}
              {vistoria.vistoriador.name}
            </Text>
            <Text>
              <Text style={styles.label}>Tipo Serviço:</Text>{" "}
              {Tipo[vistoria.type]}
            </Text>
          </View>
          <View style={styles.column}>
            <Text>
              <Text style={styles.label}>Logradouro:</Text>{" "}
              {vistoria.endereco.rua}
            </Text>
            <Text>
              <Text style={styles.label}>Bairro:</Text>{" "}
              {vistoria.endereco.bairro}
            </Text>
            <Text>
              <Text style={styles.label}>Cidade/UF:</Text>{" "}
              {vistoria.endereco.cidade} / {vistoria.endereco.estado}
            </Text>
            <Text>
              <Text style={styles.label}>CEP:</Text> {vistoria.endereco.cep}
            </Text>
          </View>
          <View style={styles.column}>
            <Text>
              <Text style={styles.label}>Contato:</Text> {vistoria.contratante}
            </Text>
            <Text>
              <Text style={styles.label}>Telefone:</Text>{" "}
              {vistoria.tel_Contratante}
            </Text>
            <Text>
              <Text style={styles.label}>Finalidade:</Text> Venda
            </Text>
          </View>
        </View>

        {/* Dados extras para A413 */}
        {vistoria.status === Status.Concluida &&
          vistoria.type === Tipo.A413 && (
            <A413Content vistoria={vistoria}  />
          )}
        {vistoria.status === Status.Concluida &&
          vistoria.endereco.tipoImovel == TipoImovel.Apartamento && (
            <View style={styles.subsection}>
              <ApartamentoContent Imovel={Imovel as ApartamentoProps} />
            </View>
          )}

        {/* B438Content */}
        {vistoria.status === Status.Concluida &&
          (vistoria.type === Tipo.B438 || vistoria.type === Tipo.B437) && (
            <B438Content Imovel={Imovel as LoteProps} />
          )}

        {/* E401Content */}
        {vistoria.status === Status.Concluida &&
          vistoria.type === Tipo.E401 && (
            <E401Content Imovel={Imovel as ObraProps} />
          )}

        {/* Em caso de pendente */}
        {vistoria.status === Status.Pendente && (
          <View style={[styles.subsection, { alignItems: "center" }]}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
              Vistoria aguardando conclusão...
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
