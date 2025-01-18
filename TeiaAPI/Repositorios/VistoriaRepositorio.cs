using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.Data;
using TeiaAPI.enums.Vistoria;
using TeiaAPI.Models;
using TeiaAPI.Models.Props;
using TeiaAPI.Repositorios.Interfaces;

namespace TeiaAPI.Repositorios
{
    public class VistoriaRepositorio : IVistoriaRepositorio
    {
        private readonly TeiaApiDBContext _context;
        private readonly IEnderecoRepositorio _enderecoRepositorio;
        private readonly IimovelRepositorio _imovelRepositorio;
        private readonly IApartamentoRepositorio _apartamentoRepositorio;
        private readonly ILoteRepositorio _loteRepositorio;
        public VistoriaRepositorio(TeiaApiDBContext context, IEnderecoRepositorio enderecoRepositorio, IimovelRepositorio imovelRepositorio, IApartamentoRepositorio apartamentoRepositorio, ILoteRepositorio loteRepositorio)
        {
            _context = context;
            _enderecoRepositorio = enderecoRepositorio;
            _imovelRepositorio = imovelRepositorio;
            _apartamentoRepositorio = apartamentoRepositorio;
            _loteRepositorio = loteRepositorio;
        }

        public async Task<List<VistoriaModel>> GetAllVistoria()
        {
            return await _context.Vistorias
                .Include(v => v.Engenheiro)
                .Include(v => v.Vistoriador)
                .Include(v => v.Endereco) 
                .Include(v => v.Imovel).ThenInclude(i => i.AreaImovel)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Pinturas)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Portas)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Revestimentos)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.AreaServico)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.Banheiros)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.Garagems)
                .Include(v => v.Imovel).ThenInclude(i => i.Infraestrutura)
                .ToListAsync();
        }

        public async Task<VistoriaModel> GetVistoriaById(int id)
        {
            return await _context.Vistorias
                .Include(v => v.Engenheiro)
                .Include(v => v.Vistoriador)
                .Include(v => v.Endereco)
                .Include(v => v.Imovel).ThenInclude(i => i.AreaImovel)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Pinturas)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Portas)
                .Include(v => v.Imovel).ThenInclude(i => i.Acabamento).ThenInclude(a => a.Revestimentos)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.AreaServico)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.Banheiros)
                .Include(v => v.Imovel).ThenInclude(i => i.Divisao).ThenInclude(d => d.Garagems)
                .Include(v => v.Imovel).ThenInclude(i => i.Infraestrutura)
                .FirstOrDefaultAsync(v => v.Id == id);
        }


        public async Task<VistoriaModel> AddVistoria(VistoriaModel vistoria, VistoriadorModel.VistoriadorProps vistoriaProps)
        {
            EnderecoModel endereco = await _enderecoRepositorio.Add(vistoria.Endereco);
            vistoria.IdEndereco = endereco.Id;
            int imovelId = await _imovelRepositorio.AddImovel(vistoria.Imovel);//, vistoriaProps);
            vistoria.IdImovel = imovelId;
            await _context.Vistorias.AddAsync(vistoria);

            await _context.SaveChangesAsync();
            return vistoria;
        }

        public async Task<bool> DeleteVistoria(int id, int idEngenheiro)
        {
            VistoriaModel vistoria = await _context.Vistorias.FirstOrDefaultAsync(v => v.Id == id && v.IdEngenheiro == idEngenheiro);
            if(vistoria == null)
            {
                throw new Exception("Vistoria não encontrada");
            }
            await _enderecoRepositorio.Delete((int)vistoria.IdEndereco);
            await _imovelRepositorio.Delete((int)vistoria.IdImovel);
            if(vistoria.Status == StatusVistoriaEnum.Concluida)
            {
                switch(vistoria.Type)
                {
                    case TypeEnum.A413:
                        await _apartamentoRepositorio.Delete((int)vistoria.IdTipoImovel);
                        break;
                    case TypeEnum.B437:
                    case TypeEnum.B438:
                        await _loteRepositorio.Delete((int)vistoria.IdTipoImovel);
                        break;
                }
            }
            _context.Vistorias.Remove(vistoria);
            await _context.SaveChangesAsync();
            return true;

        }

       
    }
}