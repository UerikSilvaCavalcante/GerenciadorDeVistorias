using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.Data;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;

namespace TeiaAPI.Repositorios
{
    public class EngenheiroRepositorio : IEngenheiroRepositorio
    {
        private readonly TeiaApiDBContext _context;
        private readonly IEnderecoRepositorio _enderecoRepositorio;
        private readonly IimovelRepositorio _imovelRepositorio;
        private readonly IApartamentoRepositorio _apartamentoRepositorio;
        
        public EngenheiroRepositorio(TeiaApiDBContext context, IEnderecoRepositorio enderecoRepositorio, IimovelRepositorio imovelRepositorio, IApartamentoRepositorio apartamentoRepositorio)
        {
            _context = context;
            _enderecoRepositorio = enderecoRepositorio;
            _imovelRepositorio = imovelRepositorio;
            _apartamentoRepositorio = apartamentoRepositorio;
        }

        public async Task<VistoriaModel> AddVistoria(EngenheiroModel.EngenheiroProps engenheiroProps)
        {
            VistoriaModel vistoria = new VistoriaModel();
            EnderecoModel endereco = await _enderecoRepositorio.Add(engenheiroProps.Endereco);
            vistoria.IdEngenheiro = engenheiroProps.IdEngenheiro;
            vistoria.IdVistoriador = engenheiroProps.IdVistoriador;
            vistoria.IdEndereco = endereco.Id;
            vistoria.NumOs = engenheiroProps.numOs;
        
            vistoria.URLMatricula = engenheiroProps.URLMatricula;
            vistoria.URLImagens = engenheiroProps.URLImagens;
            vistoria.DataVistoria = engenheiroProps.DataLancamento;
            vistoria.Type = engenheiroProps.Tipo;
            vistoria.Contratante = engenheiroProps.Contratante;
            vistoria.Tel_Contratante = engenheiroProps.Tel_Contratante;
            vistoria.Cliente = engenheiroProps.Cliente;
            vistoria.Latitude = engenheiroProps.Latitude;
            vistoria.Longitude = engenheiroProps.Longitude;
            vistoria.Obs = engenheiroProps.Obs;

            await _context.Vistorias.AddAsync(vistoria);
            await _context.SaveChangesAsync();
            return vistoria;
        }

        public async Task<bool> DeleteVistoria(int id)
        {
            VistoriaModel vistoria = await _context.Vistorias.Include(e => e.Endereco).FirstOrDefaultAsync(v => v.Id == id);
            if (vistoria == null)
            {
                return false;
            }
            if(vistoria.Status == enums.Vistoria.StatusVistoriaEnum.Concluida)
            {
                if (vistoria.Endereco.TipoImovel == EnderecoModel.tipoImovel_Enum.Apartamento)
                {
                    await _apartamentoRepositorio.Delete((int)vistoria.IdTipoImovel);
                }
                await _imovelRepositorio.Delete((int)vistoria.IdImovel);
            }
            await _enderecoRepositorio.Delete((int)vistoria.IdEndereco);
            _context.Vistorias.Remove(vistoria);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<VistoriaModel>> GetAllVistorias(int id)
        {
            return await _context.Vistorias.Where(v => v.IdEngenheiro == id)
                .Include(v => v.Vistoriador)
                .Include(v => v.Endereco)
                .ToListAsync();   
        }

        public async Task<VistoriaModel> GetVistoriaById(int id, int idEngenheiro)
        {
            return await _context.Vistorias
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
                .FirstOrDefaultAsync(v => v.Id == id && v.IdEngenheiro == idEngenheiro);
        }

        public async Task<VistoriaModel> UpdateVistoria(int id, EngenheiroModel.EngenheiroProps engenheiroProps)
        {
            VistoriaModel existingVistoria = await _context.Vistorias.FirstOrDefaultAsync(v => v.Id == id);
            if (existingVistoria == null)
            {
                throw new Exception("Vistoria não encontrada");
            }
            EnderecoModel endereco = await _enderecoRepositorio.Update(engenheiroProps.Endereco, existingVistoria.IdEndereco);
            existingVistoria.IdEngenheiro = engenheiroProps.IdEngenheiro;
            existingVistoria.IdVistoriador = engenheiroProps.IdVistoriador;
            existingVistoria.IdEndereco = endereco.Id;
            existingVistoria.NumOs = engenheiroProps.numOs;
            existingVistoria.URLMatricula = engenheiroProps.URLMatricula;
            existingVistoria.URLImagens = engenheiroProps.URLImagens;
            existingVistoria.DataVistoria = engenheiroProps.DataLancamento;
            existingVistoria.Type = engenheiroProps.Tipo;
            existingVistoria.Contratante = engenheiroProps.Contratante;
            existingVistoria.Tel_Contratante = engenheiroProps.Tel_Contratante;
            existingVistoria.Cliente = engenheiroProps.Cliente;
            existingVistoria.Latitude = engenheiroProps.Latitude;
            existingVistoria.Longitude = engenheiroProps.Longitude;
            existingVistoria.Obs = engenheiroProps.Obs;
            _context.Vistorias.Update(existingVistoria);
            await _context.SaveChangesAsync();
            return existingVistoria;
        }
    }
}