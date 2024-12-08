using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.Data;


namespace TeiaAPI.Repositorios
{
    public class LoteRepositorio : ILoteRepositorio
    {

        private readonly TeiaApiDBContext _context;
        private readonly ISolucoesRepositorio _solucoesRepositorio;
        public LoteRepositorio(TeiaApiDBContext context, ISolucoesRepositorio solucoesRepositorio)
        {
            _context = context;
            _solucoesRepositorio = solucoesRepositorio;
        }        
        public async Task<int> Add(LoteModel lote)
        {
            int id = await _solucoesRepositorio.AddSolucoes(lote.Solucoes);
            lote.SolucoesId = id;
            await _context.Lotes.AddAsync(lote);
            await _context.SaveChangesAsync();
            return lote.Id;       
        }

        public async Task<bool> Delete(int id)
        {
            LoteModel lote = await Get(id);
            if (lote == null)
            {
                return false;
            }
            await _solucoesRepositorio.Delete(lote.SolucoesId);
            _context.Lotes.Remove(lote);
            // await _context.SaveChangesAsync();
            return true;
        }

        public Task<LoteModel> Get(int id)
        {
            return _context.Lotes.Include(s => s.Solucoes).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<LoteModel> Update(LoteModel lote, int id)
        {
            LoteModel newlote = await Get(id);
            if (lote == null)
            {
                return null;
            }
            await _solucoesRepositorio.Update(newlote.SolucoesId, lote.Solucoes);
            newlote.Tipo = lote.Tipo;
            newlote.Formato = lote.Formato;
            newlote.Situacao = lote.Situacao;
            newlote.Topografia = lote.Topografia;
            newlote.UsoPredio = lote.UsoPredio;
            newlote.Acabamento = lote.Acabamento;
            newlote.Densidade = lote.Densidade;
            newlote.TransportePublico = lote.TransportePublico;
            _context.Lotes.Update(newlote);
            await _context.SaveChangesAsync();
            return newlote;
        }
    }
}