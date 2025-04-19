using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.Data;
using TeiaAPI.enums.Vistoria;
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
        private readonly ILoteRepositorio _loteRepositorio;
        private readonly IObraRepositorio _obraRepositorio;

        public EngenheiroRepositorio(TeiaApiDBContext context, IEnderecoRepositorio enderecoRepositorio, IimovelRepositorio imovelRepositorio, IApartamentoRepositorio apartamentoRepositorio, ILoteRepositorio loteRepositorio, IObraRepositorio obraRepositorio)
        {
            _context = context;
            _enderecoRepositorio = enderecoRepositorio;
            _imovelRepositorio = imovelRepositorio;
            _apartamentoRepositorio = apartamentoRepositorio;
            _loteRepositorio = loteRepositorio;
            _obraRepositorio = obraRepositorio;
        }

        public async Task<VistoriaModel> AddVistoria(EngenheiroModel.EngenheiroProps engenheiroProps)
        {
            VistoriaModel vistoria = new VistoriaModel();
            EnderecoModel endereco = await _enderecoRepositorio.Add(engenheiroProps.Endereco);
            vistoria.IdEngenheiro = engenheiroProps.IdEngenheiro;
            vistoria.IdVistoriador = engenheiroProps.IdVistoriador;
            vistoria.IdEndereco = endereco.Id;
            vistoria.NumOs = engenheiroProps.numOs;
            vistoria.DataAbertura = engenheiroProps.DataAbertura;
            vistoria.URLMatricula = engenheiroProps.URLMatricula;
            vistoria.URLImagens = engenheiroProps.URLImagens;
            vistoria.DataAbertura = engenheiroProps.DataAbertura;
            vistoria.Type = engenheiroProps.Tipo;
            vistoria.Contratante = engenheiroProps.Contratante;
            vistoria.Tel_Contratante = engenheiroProps.Tel_Contratante;
            vistoria.Cliente = engenheiroProps.Cliente;
            vistoria.Latitude = engenheiroProps.Latitude;
            vistoria.Longitude = engenheiroProps.Longitude;
            vistoria.Obs = engenheiroProps.Obs;
            vistoria.SetDataLancamento();

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
            if (vistoria.Status == StatusVistoriaEnum.Concluida)
            {
                if (vistoria.Type == TypeEnum.A413)
                {
                    if (vistoria.Endereco.TipoImovel == tipoImovelEnum.Apartamento)
                    {

                        await _apartamentoRepositorio.Delete((int)vistoria.IdTipoImovel);
                    }
                    await _imovelRepositorio.Delete((int)vistoria.IdImovel);
                }
                else if ((vistoria.Type == TypeEnum.B437 )|| (vistoria.Type == TypeEnum.B438))
                {
                    await _loteRepositorio.Delete((int)vistoria.IdTipoImovel);
                }
                else if (vistoria.Type == TypeEnum.E401)
                {
                    await _obraRepositorio.DeleteObra((int)vistoria.IdTipoImovel);
                }

            }
            await _enderecoRepositorio.Delete((int)vistoria.IdEndereco);
            _context.Vistorias.Remove(vistoria);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<VistoriaModel>> GetAllVistorias(int? id = null, StatusVistoriaEnum? status = null, TypeEnum? tipoServico = null, DateTime? dataInicio = null, DateTime? dataFim = null, tipoImovelEnum? tipoImovel = null)
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

            if (id != null)
            {
                vistorias = await query
                    .Where(v => v.IdEngenheiro == id)
                    .Include(v => v.Endereco)
                    .Include(v => v.Vistoriador)
                    .ToListAsync();
            }
            else
            {
                vistorias = await query
                    .Include(v => v.Endereco)
                    .Include(v => v.Vistoriador)
                    .ToListAsync();
            }

            return vistorias;
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
            existingVistoria.DataAbertura = engenheiroProps.DataAbertura;
            existingVistoria.Type = engenheiroProps.Tipo;
            existingVistoria.Contratante = engenheiroProps.Contratante;
            existingVistoria.Tel_Contratante = engenheiroProps.Tel_Contratante;
            existingVistoria.Cliente = engenheiroProps.Cliente;
            existingVistoria.Latitude = engenheiroProps.Latitude;
            existingVistoria.Longitude = engenheiroProps.Longitude;
            existingVistoria.Obs = engenheiroProps.Obs;
            existingVistoria.SetDataLancamento();
            _context.Vistorias.Update(existingVistoria);
            await _context.SaveChangesAsync();
            return existingVistoria;
        }
    }
}