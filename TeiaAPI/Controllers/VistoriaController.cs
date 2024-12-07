using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.enums.Vistoria;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VistoriaController : ControllerBase
    {
        private readonly IVistoriaRepositorio _vistoriaRepositorio;

        public VistoriaController(IVistoriaRepositorio vistoriaRepositorio)
        {
            _vistoriaRepositorio = vistoriaRepositorio;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<VistoriaModel>>> GetAllVistoria()
        {
            try
            {
                List<VistoriaModel> vistorias = await _vistoriaRepositorio.GetAllVistoria();
                Console.WriteLine(vistorias);
                return Ok(new {vistorias = vistorias.Select(vistoria => new{
                    id = vistoria.Id,
                    engenheiro = vistoria.Engenheiro,
                    vistoriador = vistoria.Vistoriador,
                    imovel = new {
                        id = vistoria.Imovel.Id,
                        area = vistoria.Imovel.AreaImovel.Select(a => new {
                            valor = a.valor, 
                            tipo = Enum.GetName(typeof(AreaProps.TipoAreaEnum), a.TipoArea)}
                        ),
                        frente = vistoria.Imovel.Frente,
                        acabamento = new {
                            id = vistoria.Imovel.Acabamento.Id,
                            muro = Enum.GetName(typeof(AcabamentoModel.MuroEnum), vistoria.Imovel.Acabamento.Muro),
                            pinturas = vistoria.Imovel.Acabamento.Pinturas.Select(p => new {
                                    tipo = Enum.GetName(typeof(PinturaProps.TipoPinturaEnum), p.TipoPintura),
                                    estilo = Enum.GetName(typeof(PinturaProps.EstiloEnum), p.Estilo)
                                }
                            ),
                            portas = vistoria.Imovel.Acabamento.Portas.Select(porta => new {
                                    id = porta.Id,
                                    localizacao = Enum.GetName(typeof(PortasProps.LocEnum), porta.Loc),
                                    material = Enum.GetName(typeof(PortasProps.MaterialEnum), porta.Material)
                                }
                            ),   
                            
                            piso = Enum.GetName(typeof(AcabamentoModel.PisoEnum), vistoria.Imovel.Acabamento.Piso),
                            janelas = Enum.GetName(typeof(AcabamentoModel.JanelasEnum), vistoria.Imovel.Acabamento.Janelas),
                            bancada = Enum.GetName(typeof(AcabamentoModel.BancadaEnum), vistoria.Imovel.Acabamento.Bancada),
                            quadro = vistoria.Imovel.Acabamento.QuadroEletrico,
                            revestimento = vistoria.Imovel.Acabamento.Revestimentos.Select(re => new {
                                    id = re.Id,
                                    tipo = Enum.GetName(typeof(RevestimentoProps.TipoRevestimentoEnum), re.TipoRevestimento),
                                    local = Enum.GetName(typeof(RevestimentoProps.LocalEnum), re.Local),
                                }
                            ),
                            padrao = Enum.GetName(typeof(AcabamentoModel.PadraoEnum), vistoria.Imovel.Acabamento.Padrao),
                            estado_conservacao = Enum.GetName(typeof(AcabamentoModel.EstadoConservacaoEnum), vistoria.Imovel.Acabamento.EstadoConservacao),
                            teto = Enum.GetName(typeof(AcabamentoModel.TetoEnum), vistoria.Imovel.Acabamento.Teto),
                        },
                        divisao = new {
                            id  = vistoria.Imovel.Divisao.Id,
                            area_servico = vistoria.Imovel.Divisao.AreaServico.Select(area => new {
                                    qtde = area.Qtde,
                                    tipo = Enum.GetName(typeof(AreaServicoProps.TipoAreaServicoEnum), area.Tipo),
                                }
                            ),
                            quartos = vistoria.Imovel.Divisao.Quartos,
                            salas = vistoria.Imovel.Divisao.Salas,
                            cozinhas = vistoria.Imovel.Divisao.Cozinhas,
                            banheiros = vistoria.Imovel.Divisao.Banheiros.Select(banheiro => new {
                                    qtde = banheiro.Qtde,
                                    tipo = Enum.GetName(typeof(BanheirosProps.TipoBanheiroEnum), banheiro.TipoBanheiro)
                                }
                            ),
                            sacada_varanda = vistoria.Imovel.Divisao.SacadaVaranda,
                            garagem = vistoria.Imovel.Divisao.Garagems.Select(garagem => new {
                                qtde = garagem.Qtde,
                                    tipo = Enum.GetName(typeof(GaragemProps.TipoGaragemEnum), garagem.TipoGaragem)
                                }
                            ),
                            lavabos = vistoria.Imovel.Divisao.Lavabos,
                            ar_condicionado = vistoria.Imovel.Divisao.ArCondicionado,
                            piscina = vistoria.Imovel.Divisao.Piscina,
                            outros = vistoria.Imovel.Divisao.Outros
                        },
                        infraestrutura = new {
                            id = vistoria.Imovel.Infraestrutura.Id,
                            rede_agua = vistoria.Imovel.Infraestrutura.RedeAguaP,
                            rede_esgoto = vistoria.Imovel.Infraestrutura.RedeEsgoto,
                            iluminacao = vistoria.Imovel.Infraestrutura.Iluminacao,
                            pavimentacao = vistoria.Imovel.Infraestrutura.Pavimentacao,
                            fossa = vistoria.Imovel.Infraestrutura.Fossa,
                            sumidouro = vistoria.Imovel.Infraestrutura.Sumidouro
                        },
                        // tipo = Enum.GetName(typeof(ImovelType), vistoria.Imovel.Tipo),
                    },
                    endereco = vistoria.Endereco,
                    numero_os = vistoria.NumOs,
                    url_imagens = vistoria.URLImagens,
                    url_matricula = vistoria.URLMatricula,
                    dataContratacao = vistoria.DataVistoria,
                    tipo = Enum.GetName(typeof(TypeEnum), vistoria.Type),
                    contratante = vistoria.Contratante,
                    telefone_contratante = vistoria.Tel_Contratante,
                    cliente = vistoria.Cliente,
                    latitude = vistoria.Latitude,
                    longitude = vistoria.Longitude,
                    obs =  vistoria.Obs != null ? vistoria.Obs : ""
                })});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }    
        
        [HttpGet("{id}")]
        public async Task<ActionResult<VistoriaModel>> GetVistoriaById(int id)
        {
            try
            {
                VistoriaModel vistoria = await _vistoriaRepositorio.GetVistoriaById(id);
                return Ok(new {vistoria = new{
                    id = vistoria.Id,
                    engenheiro = vistoria.Engenheiro,
                    vistoriador = vistoria.Vistoriador,
                    imovel = new {
                        id = vistoria.Imovel.Id,
                        area = new {
                            valor = vistoria.Imovel.AreaImovel.Select(area => area.valor),
                            tipo = vistoria.Imovel.AreaImovel.Select(area => Enum.GetName(typeof(AreaProps.TipoAreaEnum), area.TipoArea))
                        },
                        frente = vistoria.Imovel.Frente,
                        acabamento = new {
                            id = vistoria.Imovel.Acabamento.Id,
                            muro = Enum.GetName(typeof(AcabamentoModel.MuroEnum), vistoria.Imovel.Acabamento.Muro),
                            pinturas = new {
                                tipo = vistoria.Imovel.Acabamento.Pinturas.Select(pintura => Enum.GetName(typeof(PinturaProps.TipoPinturaEnum), pintura.TipoPintura)),
                                estilo = vistoria.Imovel.Acabamento.Pinturas.Select(pintura => Enum.GetName(typeof(PinturaProps.EstiloEnum), pintura.Estilo))
                            },
                            portas = new {
                                id = vistoria.Imovel.Acabamento.Portas.Select(porta => porta.Id),
                                localizacao = vistoria.Imovel.Acabamento.Portas.Select(porta => Enum.GetName(typeof(PortasProps.LocEnum), porta.Loc)),
                                material = vistoria.Imovel.Acabamento.Portas.Select(porta => Enum.GetName(typeof(PortasProps.MaterialEnum), porta.Material))   
                            },
                            piso = Enum.GetName(typeof(AcabamentoModel.PisoEnum), vistoria.Imovel.Acabamento.Piso),
                            janelas = Enum.GetName(typeof(AcabamentoModel.JanelasEnum), vistoria.Imovel.Acabamento.Janelas),
                            bancada = Enum.GetName(typeof(AcabamentoModel.BancadaEnum), vistoria.Imovel.Acabamento.Bancada),
                            quadro = vistoria.Imovel.Acabamento.QuadroEletrico,
                            revestimento = new {
                                id = vistoria.Imovel.Acabamento.Revestimentos.Select(revestimento => revestimento.Id),
                                tipo = vistoria.Imovel.Acabamento.Revestimentos.Select(revestimento => Enum.GetName(typeof(RevestimentoProps.TipoRevestimentoEnum), revestimento.TipoRevestimento)),
                                local = vistoria.Imovel.Acabamento.Revestimentos.Select(revestimento => Enum.GetName(typeof(RevestimentoProps.LocalEnum), revestimento.Local)),

                            },
                            padrao = Enum.GetName(typeof(AcabamentoModel.PadraoEnum), vistoria.Imovel.Acabamento.Padrao),
                            estado_conservacao = Enum.GetName(typeof(AcabamentoModel.EstadoConservacaoEnum), vistoria.Imovel.Acabamento.EstadoConservacao),
                            teto = Enum.GetName(typeof(AcabamentoModel.TetoEnum), vistoria.Imovel.Acabamento.Teto),
                        },
                        divisao = new {
                            id  = vistoria.Imovel.Divisao.Id,
                            area_servico = new {
                                qtde = vistoria.Imovel.Divisao.AreaServico.Select(area => area.Qtde),
                                tipo = vistoria.Imovel.Divisao.AreaServico.Select(area => Enum.GetName(typeof(AreaServicoProps.TipoAreaServicoEnum), area.Tipo)),
                            },
                            quartos = vistoria.Imovel.Divisao.Quartos,
                            salas = vistoria.Imovel.Divisao.Salas,
                            cozinhas = vistoria.Imovel.Divisao.Cozinhas,
                            banheiros = new {
                                qtde = vistoria.Imovel.Divisao.Banheiros.Select(banheiro => banheiro.Qtde),
                                tipo = vistoria.Imovel.Divisao.Banheiros.Select(banheiro => Enum.GetName(typeof(BanheirosProps.TipoBanheiroEnum), banheiro.TipoBanheiro))
                            },
                            sacada_varanda = vistoria.Imovel.Divisao.SacadaVaranda,
                            garagem = new {
                                qtde = vistoria.Imovel.Divisao.Garagems.Select(garagem => garagem.Qtde),
                                tipo = vistoria.Imovel.Divisao.Garagems.Select(garagem => Enum.GetName(typeof(GaragemProps.TipoGaragemEnum), garagem.TipoGaragem))
                            },
                            lavabos = vistoria.Imovel.Divisao.Lavabos,
                            ar_condicionado = vistoria.Imovel.Divisao.ArCondicionado,
                            piscina = vistoria.Imovel.Divisao.Piscina,
                            outros = vistoria.Imovel.Divisao.Outros
                        },
                        infraestrutura = new {
                            id = vistoria.Imovel.Infraestrutura.Id,
                            rede_agua = vistoria.Imovel.Infraestrutura.RedeAguaP,
                            rede_esgoto = vistoria.Imovel.Infraestrutura.RedeEsgoto,
                            iluminacao = vistoria.Imovel.Infraestrutura.Iluminacao,
                            pavimentacao = vistoria.Imovel.Infraestrutura.Pavimentacao,
                            fossa = vistoria.Imovel.Infraestrutura.Fossa,
                            sumidouro = vistoria.Imovel.Infraestrutura.Sumidouro
                        },
                        // tipo = Enum.GetName(typeof(ImovelType), vistoria.Imovel.Tipo),
                    },
                    endereco = vistoria.Endereco,
                    numero_os = vistoria.NumOs,
                    url_imagens = vistoria.URLImagens,
                    url_matricula = vistoria.URLMatricula,
                    dataContratacao = vistoria.DataVistoria,
                    tipo = Enum.GetName(typeof(TypeEnum), vistoria.Type),
                    contratante = vistoria.Contratante,
                    telefone_contratante = vistoria.Tel_Contratante,
                    cliente = vistoria.Cliente,
                    latitude = vistoria.Latitude,
                    longitude = vistoria.Longitude,
                    obs =  vistoria.Obs != null ? vistoria.Obs : ""
                }});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // [HttpPost]
        // public async Task<ActionResult> AddVistoria([FromBody] VistoriaModel vistoria)
        // {
        //     try
        //     {
        //         return Ok(await _vistoriaRepositorio.AddVistoria(vistoria));
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        // }

        // [HttpPut("{id}")]
        // public async Task<ActionResult> UpdateVistoria([FromBody] VistoriaModel vistoria, int id)
        // {
        //     try
        //     {
        //         return Ok(await _vistoriaRepositorio.UpdateVistoria(vistoria, id));
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        
        // }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult> DeleteVistoria(int id)
        // {
        //     try
        //     {
        //         return Ok(await _vistoriaRepositorio.DeleteVistoria(id));
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        // }   
    }
}