using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeiaAPI.enums.User;
using TeiaAPI.enums.Vistoria;
using TeiaAPI.Models;
using TeiaAPI.Models.Props;
using TeiaAPI.Repositorios.Interfaces;

namespace TeiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VistoriadorController : ControllerBase
    {
        private readonly IVistoriadorRepositorio _vistoriadorRepositorio;
        private readonly IUserRepositorio _userRepositorio;
        private readonly IApartamentoRepositorio _apartamentoRepositorio;
        public VistoriadorController(IVistoriadorRepositorio vistoriadorRepositorio, IUserRepositorio userRepositorio, IApartamentoRepositorio apartamentoRepositorio)
        {
            _vistoriadorRepositorio = vistoriadorRepositorio;
            _userRepositorio = userRepositorio;
            _apartamentoRepositorio = apartamentoRepositorio;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<VistoriaModel>>> GetAllVistorias(int id)
        {
            UserModel user = await _userRepositorio.GetUserById(id);
            if (user.Type == TypeUserEnum.Vistoriador)
            {
                List<VistoriaModel> vistorias = await _vistoriadorRepositorio.GetAllVistorias(id);
               
                return Ok(new
                {
                    Vistoriador = new { Vistoriador = user.Name },
                    vistorias = vistorias.Select(vistoria => new
                    {
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
                    endereco = new {
                        id = vistoria.Endereco.Id,
                        rua = vistoria.Endereco.Rua,
                        numero = vistoria.Endereco.Numero,
                        bairro = vistoria.Endereco.Bairro,
                        cidade = vistoria.Endereco.Cidade,
                        estado = vistoria.Endereco.Estado,
                        cep = vistoria.Endereco.Cep,
                        complemento = vistoria.Endereco.Complemento,
                        tipoImovel = Enum.GetName(typeof(EnderecoModel.tipoImovel_Enum), vistoria.Endereco.TipoImovel)
                    },
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
                    })
                });
            }

            return BadRequest("Usuario não tem permissão para acessar essa rota");
        }

        [HttpGet("{id}/{idVistoria}")]
        public async Task<ActionResult<VistoriaModel>> GetVistoriaById(int id, int idVistoria)
        {
            UserModel user = await _userRepositorio.GetUserById(id);
            if (user.Type == TypeUserEnum.Vistoriador)
            {
                VistoriaModel vistoria = await _vistoriadorRepositorio.GetVistoriaById(id, idVistoria);
                ApartamentoModel apartamento = await _apartamentoRepositorio.GetApartamentoById((int)vistoria.IdTipoImovel);
                if (vistoria == null)
                {
                    return NotFound("Vistoria não encontrada");
                }
                return Ok(new 
                {
                    Vistoriador = new { Vistoriador = user.Name },
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
                    endereco = new {
                        id = vistoria.Endereco.Id,
                        rua = vistoria.Endereco.Rua,
                        numero = vistoria.Endereco.Numero,
                        bairro = vistoria.Endereco.Bairro,
                        cidade = vistoria.Endereco.Cidade,
                        estado = vistoria.Endereco.Estado,
                        cep = vistoria.Endereco.Cep,
                        complemento = vistoria.Endereco.Complemento,
                        tipoImovel = Enum.GetName(typeof(EnderecoModel.tipoImovel_Enum), vistoria.Endereco.TipoImovel)
                    },
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
                    obs =  vistoria.Obs != null ? vistoria.Obs : "",
                    // imovelTipo = vistoria.Imovel.Tipo == ImovelType.Apartamento ? await _apartamentoRepositorio.GetApartamentoById((int)vistoria.IdImovel) : null             
                });
            }

            return BadRequest("Usuario não tem permissão para acessar essa rota");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<VistoriaModel>> AtualizarVistoria([FromBody] VistoriadorModel.VistoriadorProps vistoria, int id)
        {
            UserModel user = await _userRepositorio.GetUserById(id);
            if (user.Type == TypeUserEnum.Vistoriador)
            {
                VistoriaModel vistoriaAtualizada = await _vistoriadorRepositorio.GetVistoriaById(id, vistoria.IdVistoria);
                switch (vistoriaAtualizada.Endereco.TipoImovel)
                {
                    case EnderecoModel.tipoImovel_Enum.Apartamento:
                        if (vistoria.Apartamento == null)
                        {
                            return BadRequest("Apartamento não pode ser nulo");
                        }
                        break;
                    case EnderecoModel.tipoImovel_Enum.Lote:
                        if (vistoria.Lote == null)
                        {
                            return BadRequest("Lote não pode ser nulo");
                        }
                        break;
                    default:
                        break;
                }
                vistoriaAtualizada = await _vistoriadorRepositorio.AtualizarVistoria(vistoria, id);
                if (vistoriaAtualizada == null)
                {
                    return NotFound("Vistoria não encontrada");
                }
                return Ok(new
                {
                    vistoria = new
                    {
                        id = vistoriaAtualizada.Id,
                        engenheiro = vistoriaAtualizada.Engenheiro,
                        numero_os = vistoriaAtualizada.NumOs,
                        url_imagens = vistoriaAtualizada.URLImagens,
                        url_matricula = vistoriaAtualizada.URLMatricula,
                        dataContratacao = vistoriaAtualizada.DataVistoria,
                        tipo = Enum.GetName(typeof(TypeEnum), vistoriaAtualizada.Type),
                        contratante = vistoriaAtualizada.Contratante,
                        telefone_contratante = vistoriaAtualizada.Tel_Contratante,
                        cliente = vistoriaAtualizada.Cliente,
                        latitude = vistoriaAtualizada.Latitude,
                        longitude = vistoriaAtualizada.Longitude,
                        obs = vistoriaAtualizada.Obs != null ? vistoriaAtualizada.Obs : ""
                    }
                });
            }

            return BadRequest("Usuario não tem permissão para acessar essa rota");
        }
    }
}