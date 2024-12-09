using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Data;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.enums.Vistoria;

namespace TeiaAPI.Repositorios
{
    public class VistoriadorRepositorio : IVistoriadorRepositorio
    {
        private readonly TeiaApiDBContext _context;
        private readonly IEnderecoRepositorio _enderecoRepositorio;
        private readonly IimovelRepositorio _imovelRepositorio;
        private readonly IApartamentoRepositorio _apartamentoRepositorio;
        private readonly ILoteRepositorio _loteRepositorio;
        private readonly IObraRepositorio _obraRepositorio;


        public VistoriadorRepositorio(TeiaApiDBContext context, IEnderecoRepositorio enderecoRepositorio, IimovelRepositorio imovelRepositorio, IApartamentoRepositorio apartamentoRepositorio, ILoteRepositorio loteRepositorio, IObraRepositorio obraRepositorio)
        {
            _context = context;
            _enderecoRepositorio = enderecoRepositorio;
            _imovelRepositorio = imovelRepositorio;
            _apartamentoRepositorio = apartamentoRepositorio;
            _loteRepositorio = loteRepositorio;
            _obraRepositorio = obraRepositorio;
        }

        public async Task<VistoriaModel> AtualizarVistoria(VistoriadorModel.VistoriadorProps vistoria, int id)
        {
            VistoriaModel vistoriaAtualizada = await _context.Vistorias.FirstOrDefaultAsync(x => x.Id == vistoria.IdVistoria);
            if (vistoriaAtualizada == null)
            {
                return null;
            }
            vistoriaAtualizada.SetDataConclusao();
            vistoriaAtualizada.URLImagens = vistoria.URLImagens;
            vistoriaAtualizada.Latitude = vistoria.Latitude;
            vistoriaAtualizada.Longitude = vistoria.Longitude;
            if (vistoriaAtualizada.Status == StatusVistoriaEnum.Pendente)
            {
                if (vistoriaAtualizada.Type == TypeEnum.A413)
                {
                    int imovelId = await _imovelRepositorio.AddImovel(vistoria.Imovel, vistoria);
                    vistoriaAtualizada.IdImovel = imovelId;
                    switch (vistoriaAtualizada.Endereco.TipoImovel){
                        case tipoImovelEnum.Apartamento:
                            ApartamentoModel apartamento = await _apartamentoRepositorio.AddApartamento(vistoria.Apartamento);
                            vistoriaAtualizada.IdTipoImovel = apartamento.Id;
                            break;
                        case tipoImovelEnum.Casa:
                            vistoriaAtualizada.Imovel.Telhado = (ImovelModel.Telhado_enum?)vistoria.Imovel.Telhado;
                            break;
                }
                }else if(vistoriaAtualizada.Type == TypeEnum.B437 || vistoriaAtualizada.Type == TypeEnum.B438)
                {
                    int idLote = await _loteRepositorio.Add(vistoria.Lote);
                    vistoriaAtualizada.IdTipoImovel = idLote;   
                }else if (vistoriaAtualizada.Type == TypeEnum.E401){
                    ObraModel obra = await _obraRepositorio.AddObra(vistoria.Obra);
                    vistoriaAtualizada.IdTipoImovel = obra.Id;
                }
                vistoriaAtualizada.Status = StatusVistoriaEnum.Concluida;
            }else if(vistoriaAtualizada.Status == StatusVistoriaEnum.Concluida)
            {
                ImovelModel imovel = await _imovelRepositorio.Update((int)vistoriaAtualizada.IdImovel, vistoria.Imovel, vistoria);
                vistoriaAtualizada.IdImovel = imovel.Id;
                    if (vistoriaAtualizada.Type == TypeEnum.A413){
                        switch (vistoriaAtualizada.Endereco.TipoImovel){
                            case tipoImovelEnum.Apartamento:
                                ApartamentoModel apartamento = await _apartamentoRepositorio.UpdateApartamento(vistoria.Apartamento, (int)vistoriaAtualizada.IdTipoImovel);
                                vistoriaAtualizada.IdTipoImovel = apartamento.Id;
                                break;
                            case tipoImovelEnum.Casa:
                                vistoriaAtualizada.Imovel.Telhado = (ImovelModel.Telhado_enum?)vistoria.Imovel.Telhado;
                                break;
                        }
                    }else if(vistoriaAtualizada.Type == TypeEnum.B437 || vistoriaAtualizada.Type == TypeEnum.B438)
                    {
                        LoteModel lote = await _loteRepositorio.Update(vistoria.Lote, (int)vistoriaAtualizada.IdTipoImovel);
                        vistoriaAtualizada.IdTipoImovel = lote.Id;
                    }else if (vistoriaAtualizada.Type == TypeEnum.E401){
                        ObraModel obra = await _obraRepositorio.UpdateObra(vistoria.Obra, (int)vistoriaAtualizada.IdTipoImovel);
                        vistoriaAtualizada.IdTipoImovel = obra.Id;
                    }
            }
            _context.Vistorias.Update(vistoriaAtualizada);
            await _context.SaveChangesAsync();
            return vistoriaAtualizada;
        }

        public async Task<List<VistoriaModel>> GetAllVistorias(int id, StatusVistoriaEnum? status = null, TypeEnum? tipoServico = null, DateTime? dataInicio = null, DateTime? dataFim = null, tipoImovelEnum? tipoImovel = null)
        {
            List<VistoriaModel> vistorias = new List<VistoriaModel>();
          
                    var query = _context.Vistorias.AsQueryable();

                    if (status != null)
                    {
                        query = query.Where(v => v.Status == status);
                    }

                    if (tipoServico != null)
                    {
                        query = query.Where(v => v.Type == tipoServico);
                    }

                    if (dataInicio != null)
                    {
                        query = query.Where(v => v.DataAbertura >= dataInicio);
                    }

                    if (dataFim != null)
                    {
                        query = query.Where(v => v.DataAbertura <= dataFim);
                    }

                    if (tipoImovel != null)
                    {
                        query = query.Where(v => v.Endereco.TipoImovel == tipoImovel);
                    }

                    vistorias = await query
                        .Where(v => v.IdEngenheiro == id)
                        .Include(v => v.Endereco)
                        .Include(v => v.Vistoriador)
                        .ToListAsync();
                
            return vistorias;  
        }

        public Task<VistoriaModel> GetVistoriaById(int id, int idVistoria)
        {


#pragma warning disable CS8619 // A anulabilidade de tipos de referência no valor não corresponde ao tipo de destino.
            return _context.Vistorias
                .Where(v => v.IdVistoriador == id)
                .Include(v => v.Engenheiro)
                .Include(v => v.Endereco)
                .Include(v => v.Imovel).ThenInclude(i => i.AreaImovel)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Pinturas)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Portas)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Revestimentos)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.AreaServico)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.Banheiros)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.Garagems)
                .Include(v => v.Imovel).ThenInclude(i => i.Infraestrutura)
                .FirstOrDefaultAsync(v => v.Id == idVistoria);
#pragma warning restore CS8619 // A anulabilidade de tipos de referência no valor não corresponde ao tipo de destino.
        }
    }
}