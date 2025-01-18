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
using TeiaAPI.Helper;

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
                return Ok(vistorias);
            }
            catch (Exception e)
            {
                return BadRequest($"Erro ao buscar Vistorias: {e}");
            }

        }

        [HttpGet("AllVistoriadores")]
        public async Task<ActionResult<List<UserModel>>> GetAllVistoriadores()
        {
            try
            {
                List<UserModel> vistoriadores = await _userRepositorio.GetAllVistoriadores();
                return Ok(vistoriadores);
            }
            catch (Exception e)
            {
                return BadRequest($"Erro ao buscar Vistoriadores: {e}");
            }
        }

        [HttpGet("TipoImovel/{id}")]
        public async Task<ActionResult> GetTipoImovel(int id, [FromQuery] tipoImovelEnum tipoImovel)
        {
            try
            {

                switch (tipoImovel)
                {
                    case tipoImovelEnum.Apartamento:
                        ApartamentoModel apartamentos = await _apartamentoRepositorio.GetApartamentoById(id);
                        return Ok(apartamentos);
                    case tipoImovelEnum.Lote:
                        LoteModel lotes = await _loteRepositorio.Get(id);
                        return Ok(lotes);
                    default:
                        return BadRequest("Tipo de Imovel não encontrado");
                }
            }
            catch (Exception e)
            {
                return BadRequest($"Erro ao buscar Tipo de Imovel: {e}");
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
                if (vistoria != null)
                {

                    if (vistoria.Status != StatusVistoriaEnum.Cancelada)
                    {

                        return Ok(
                            vistoria
                        );
                    }
                    else
                    {
                        return BadRequest("Vistoria Cancelada");
                    }
                }
                else
                {
                    return NotFound("Vistoria não encontrada!");
                }
            }
            catch (Exception e)
            {
                return BadRequest($"Erro ao buscar Vistoria: {e}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<bool>> AddVistoria(EngenheiroModel.EngenheiroProps engenheiroProps)
        {
            try
            {
                if (engenheiroProps.Tipo == TypeEnum.E401 && engenheiroProps.Endereco.TipoImovel != tipoImovelEnum.Obra)
                {
                    return BadRequest(new
                    {
                        message = false,
                        erro = Erros.ErroDeTipoImovel()[102]
                    });
                }
                if (engenheiroProps.Tipo == TypeEnum.B438 || engenheiroProps.Tipo == TypeEnum.B437 && engenheiroProps.Endereco.TipoImovel != tipoImovelEnum.Lote)
                {
                    return BadRequest(new
                    {
                        message = false,
                        erro = Erros.ErroDeTipoImovel()[102]
                    });
                }
                if (engenheiroProps.Endereco.TipoImovel == tipoImovelEnum.Apartamento && engenheiroProps.Tipo != TypeEnum.A413)
                {
                    return BadRequest(new
                    {
                        message = false,
                        erro = Erros.ErroDeTipoImovel()[102]
                    });
                }
                if (engenheiroProps.Endereco.TipoImovel == tipoImovelEnum.Casa && engenheiroProps.Tipo != TypeEnum.A413)
                {
                    return BadRequest(new
                    {
                        message = false,
                        erro = Erros.ErroDeTipoImovel()[102]
                    });
                }

                VistoriaModel vistoriaModel = await _engenheiroRepositorio.AddVistoria(engenheiroProps);
                return Ok(true);
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
                return Ok(vistoria);
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