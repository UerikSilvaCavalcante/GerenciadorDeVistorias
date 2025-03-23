using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

        private readonly ILoteRepositorio _loteRepositorio;
        public VistoriadorController(IVistoriadorRepositorio vistoriadorRepositorio, IUserRepositorio userRepositorio, IApartamentoRepositorio apartamentoRepositorio, ILoteRepositorio loteRepositorio)
        {
            _vistoriadorRepositorio = vistoriadorRepositorio;
            _userRepositorio = userRepositorio;
            _apartamentoRepositorio = apartamentoRepositorio;
            _loteRepositorio = loteRepositorio;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<List<VistoriaModel>>> GetAllVistorias(int id, [FromQuery] StatusVistoriaEnum? status = null, [FromQuery] TypeEnum? TipoServico = null, [FromQuery] tipoImovelEnum? TipoImovel = null, [FromQuery] DateTime? dataInicio = null, [FromQuery] DateTime? dataFim = null)
        {
            UserModel user = await _userRepositorio.GetUserById(id);
            if (user.Type == TypeUserEnum.Vistoriador && user.Status == StatusEnum.Ativado)
            {
                List<VistoriaModel> vistorias = await _vistoriadorRepositorio.GetAllVistorias(id, status, TipoServico, dataInicio, dataFim, TipoImovel);

                return Ok(vistorias);
            }

            return BadRequest("Usuario não tem permissão para acessar essa rota");
        }

        [Authorize]
        [HttpGet("{id}/{idVistoria}")]
        public async Task<ActionResult<VistoriaModel>> GetVistoriaById(int id, int idVistoria)
        {
            try
            {
                UserModel user = await _userRepositorio.GetUserById(id);
                if (user.Type == TypeUserEnum.Vistoriador)
                {
                    VistoriaModel vistoria = await _vistoriadorRepositorio.GetVistoriaById(id, idVistoria);
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
                return BadRequest("Usuario não tem permissão para acessar essa rota");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
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

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<VistoriaModel>> AtualizarVistoria([FromBody] VistoriadorModel.VistoriadorProps vistoria, int id)
        {
            UserModel user = await _userRepositorio.GetUserById(id);
            if (user.Type == TypeUserEnum.Vistoriador)
            {
                VistoriaModel vistoriaAtualizada = await _vistoriadorRepositorio.GetVistoriaById(id, vistoria.IdVistoria);
                switch (vistoriaAtualizada.Endereco.TipoImovel)
                {
                    case tipoImovelEnum.Apartamento:
                        if (vistoria.Apartamento == null)
                        {
                            return BadRequest("Apartamento não pode ser nulo");
                        }
                        break;
                    case tipoImovelEnum.Lote:
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
                return Ok(vistoriaAtualizada);
            }

            return BadRequest("Usuario não tem permissão para acessar essa rota");
        }
    }
}