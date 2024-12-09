using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeiaAPI.enums.Vistoria;
using TeiaAPI.enums.User;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EngenheiroController : ControllerBase
    {
        private readonly IEngenheiroRepositorio _engenheiroRepositorio;
        private readonly IUserRepositorio _userRepositorio;
        private readonly IApartamentoRepositorio _apartamentoRepositorio;
        private readonly ILoteRepositorio _loteRepositorio;
        public EngenheiroController(IEngenheiroRepositorio engenheiroRepositorio, IUserRepositorio userRepositorio, IApartamentoRepositorio apartamentoRepositorio, ILoteRepositorio loteRepositorio)
        {
            _engenheiroRepositorio = engenheiroRepositorio;
            _userRepositorio = userRepositorio;
            _apartamentoRepositorio = apartamentoRepositorio;
            _loteRepositorio = loteRepositorio;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<VistoriaModel>>> GetAllVistorias(int id, [FromQuery] StatusVistoriaEnum? status = null, [FromQuery] TypeEnum? TipoServico = null, [FromQuery] tipoImovelEnum? TipoImovel = null, [FromQuery] DateTime? dataInicio = null, [FromQuery] DateTime? dataFim = null)
        {
            try
            {
                UserModel user = await _userRepositorio.GetUserById(id);
                if (user.Type != TypeUserEnum.Engenheiro && user.Status != StatusEnum.Ativado) 
                {
                    return BadRequest("Usuario não tem permissão para acessar essa rota");	
                }

                List<VistoriaModel> vistorias = await _engenheiroRepositorio.GetAllVistorias(id, status, TipoServico, dataInicio, dataFim, TipoImovel);
                return Ok( new {Engenheiro = user.Name, vistorias = vistorias.Select(vistoria => new{
                        id = vistoria.Id,
                        vistoriador = vistoria.Vistoriador,
                        numero_os = vistoria.NumOs,
                        url_imagens = vistoria.URLImagens,
                        url_matricula = vistoria.URLMatricula,
                        dataLancamento = vistoria.DataLancamento,
                        dataAbertura = vistoria.DataAbertura,
                        endereco = new {
                                    id = vistoria.Endereco.Id,
                                    rua = vistoria.Endereco.Rua,
                                    numero = vistoria.Endereco.Numero,
                                    bairro = vistoria.Endereco.Bairro,
                                    cidade = vistoria.Endereco.Cidade,
                                    estado = vistoria.Endereco.Estado,
                                    cep = vistoria.Endereco.Cep,
                                    complemento = vistoria.Endereco.Complemento,
                                    tipoImovel = Enum.GetName(typeof(tipoImovelEnum), vistoria.Endereco.TipoImovel)
                                },
                        tipo = Enum.GetName(typeof(TypeEnum), vistoria.Type),
                        contratante = vistoria.Contratante,
                        telefone_contratante = vistoria.Tel_Contratante,
                        cliente = vistoria.Cliente,
                        latitude = vistoria.Latitude,
                        longitude = vistoria.Longitude,
                        obs =  vistoria.Obs != null ? vistoria.Obs : "",
                        status = Enum.GetName(typeof(StatusVistoriaEnum), vistoria.Status)

                    })});
            }catch (Exception e)
            {
                return BadRequest($"Erro ao buscar Vistorias: {e}");
            }
            
        }

        [HttpGet("{id}/{idVistoria}")]
        public async Task<ActionResult<VistoriaModel>> GetVistoriaById(int id, int idVistoria)
        {
            try
            {
                UserModel user = await _userRepositorio.GetUserById(id);
                if (user.Type != TypeUserEnum.Engenheiro && user.Status != StatusEnum.Ativado)
                {
                    return BadRequest("Usuario não tem permissão para acessar essa rota");	
                }

                VistoriaModel vistoria = await _engenheiroRepositorio.GetVistoriaById(idVistoria, id);
                if(vistoria != null){
                    if (vistoria.Status == StatusVistoriaEnum.Concluida)
                    {
                        var tipoImovel = new object();
                        if (vistoria.Endereco.TipoImovel == tipoImovelEnum.Apartamento){
                            tipoImovel = await _apartamentoRepositorio.GetApartamentoById((int)vistoria.IdTipoImovel);
                        }else if(vistoria.Endereco.TipoImovel == tipoImovelEnum.Lote){
                            tipoImovel = await _loteRepositorio.Get((int)vistoria.IdTipoImovel);
                        }else {
                            tipoImovel = null;
                        }
                        // return Ok(vistoria);

                        return Ok(new {User = user.Name,
                                vistoria = new{
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
                                    tipoImovel = Enum.GetName(typeof(tipoImovelEnum), vistoria.Endereco.TipoImovel)
                                },
                                numero_os = vistoria.NumOs,
                                url_imagens = vistoria.URLImagens,
                                url_matricula = vistoria.URLMatricula,
                                dataLancamento = vistoria.DataLancamento,
                                dataAbertura = vistoria.DataAbertura,
                                dataConclusao = vistoria.DataConclusao,
                                tipo = Enum.GetName(typeof(TypeEnum), vistoria.Type),
                                contratante = vistoria.Contratante,
                                telefone_contratante = vistoria.Tel_Contratante,
                                cliente = vistoria.Cliente,
                                latitude = vistoria.Latitude,
                                longitude = vistoria.Longitude,
                                obs =  vistoria.Obs != null ? vistoria.Obs : "",
                                imovelTipo = tipoImovel,
                                status = Enum.GetName(typeof(StatusVistoriaEnum), vistoria.Status)
                            }});
                    } else if(vistoria.Status == StatusVistoriaEnum.Pendente){
                        return Ok(new {vistoria = new{
                            id = vistoria.Id,
                            engenheiro = vistoria.Engenheiro,
                            vistoriador = vistoria.Vistoriador,
                            numero_os = vistoria.NumOs,
                            url_imagens = vistoria.URLImagens,
                            url_matricula = vistoria.URLMatricula,
                            dataLancamento = vistoria.DataLancamento,
                            dataAbertura = vistoria.DataAbertura,
                            tipo = Enum.GetName(typeof(TypeEnum), vistoria.Type),
                            contratante = vistoria.Contratante,
                            telefone_contratante = vistoria.Tel_Contratante,
                            cliente = vistoria.Cliente,
                            latitude = vistoria.Latitude,
                            longitude = vistoria.Longitude,
                            obs =  vistoria.Obs != null ? vistoria.Obs : "",
                            status = Enum.GetName(typeof(StatusVistoriaEnum), vistoria.Status)
                        }});
                    } else{
                        return BadRequest("Vistoria Cancelada");
                    }
                } else {
                    return NotFound("Vistoria não encontrada!");
                }
            } catch (Exception e)
            {
                return BadRequest($"Erro ao buscar Vistoria: {e}");
            }
        } 

        [HttpPost]
        public async Task<ActionResult<VistoriaModel>> AddVistoria(EngenheiroModel.EngenheiroProps engenheiroProps)
        {
            try
            {
                if (engenheiroProps.Tipo == TypeEnum.E401 && engenheiroProps.Endereco.TipoImovel != tipoImovelEnum.Obra)
                {
                    return BadRequest("Tipo de serviço não compativel com o tipo de imovel");
                }else if (engenheiroProps.Tipo == TypeEnum.B438 || engenheiroProps.Tipo == TypeEnum.B437  && engenheiroProps.Endereco.TipoImovel != tipoImovelEnum.Lote)
                {
                    return BadRequest("Tipo de serviço não compativel com o tipo de imovel");
                }else if (engenheiroProps.Tipo == TypeEnum.A413 && engenheiroProps.Endereco.TipoImovel != tipoImovelEnum.Apartamento || engenheiroProps.Endereco.TipoImovel != tipoImovelEnum.Casa)
                {
                    return BadRequest("Tipo de serviço não compativel com o tipo de imovel");
                }
                
                VistoriaModel vistoriaModel = await _engenheiroRepositorio.AddVistoria(engenheiroProps);    
                return Ok(new {vistoria = new{
                    id = vistoriaModel.Id,
                    engenheiro = vistoriaModel.Engenheiro,
                    vistoriador = vistoriaModel.Vistoriador,
                    numero_os = vistoriaModel.NumOs,
                    url_imagens = vistoriaModel.URLImagens,
                    url_matricula = vistoriaModel.URLMatricula,
                    dataLancamento = vistoriaModel.DataLancamento,
                    dataAbertura = vistoriaModel.DataAbertura,
                    tipo = Enum.GetName(typeof(TypeEnum), vistoriaModel.Type),
                    contratante = vistoriaModel.Contratante,
                    telefone_contratante = vistoriaModel.Tel_Contratante,
                    cliente = vistoriaModel.Cliente,
                    latitude = vistoriaModel.Latitude,
                    longitude = vistoriaModel.Longitude,
                    obs =  vistoriaModel.Obs != null ? vistoriaModel.Obs : ""
                }});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<VistoriaModel>> UpdateVistoria(int id, EngenheiroModel.EngenheiroProps engenheiroProps)
        {
            try
            {
                VistoriaModel vistoria = await _engenheiroRepositorio.UpdateVistoria(id, engenheiroProps);
                return Ok(new {vistoria = new{
                    id = vistoria.Id,
                    engenheiro = vistoria.Engenheiro,
                    vistoriador = vistoria.Vistoriador,
                    numero_os = vistoria.NumOs,
                    url_imagens = vistoria.URLImagens,
                    url_matricula = vistoria.URLMatricula,
                    dataLancamento = vistoria.DataLancamento,
                    dataAbertura = vistoria.DataAbertura,
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
                return BadRequest($"Falha ao atualizar Vistoria: {e.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteVistoria(int id)
        {
            try
            {
                bool deleted = await _engenheiroRepositorio.DeleteVistoria(id);
                return Ok(deleted);
            }
            catch (Exception e)
            {
                return BadRequest($"Falha ao deletar Vistoria: {e}");
            }
        }
    }
}