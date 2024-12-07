using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Data;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace TeiaAPI.Repositorios
{
    public class BlocoRepositorio : IBlocoRepositorio
    {
        private readonly TeiaApiDBContext _context;
        public BlocoRepositorio(TeiaApiDBContext context)
        {
            _context = context;
        }
        public async Task<int> AddBloco(BlocoPredioModel bloco)
        {
            await _context.BlocoPredio.AddAsync(bloco);
            await _context.SaveChangesAsync();
            return bloco.Id;
        }

        public async Task<bool> Delete(int id)
        {
            BlocoPredioModel bloco = await _context.BlocoPredio.FirstOrDefaultAsync(bloco => bloco.Id == id);
            if (bloco == null)
            {
                return false;
            }
            _context.BlocoPredio.Remove(bloco);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<BlocoPredioModel> Update(int id, BlocoPredioModel bloco)
        {
            BlocoPredioModel? newBloco = await _context.BlocoPredio.FirstOrDefaultAsync(b => b.Id == id);
            if (bloco == null)
            {
                return null;
            }
            newBloco.Pavimentos = bloco.Pavimentos;
            newBloco.Elevadores = bloco.Elevadores;
            newBloco.Idade = bloco.Idade;
            newBloco.AptosPorAndar = bloco.AptosPorAndar;
            newBloco.UnidadesPredio = bloco.UnidadesPredio;
            newBloco.Subsolos = bloco.Subsolos;
            newBloco.Blocos = bloco.Blocos;
            newBloco.Outros = bloco.Outros;
            _context.BlocoPredio.Update(newBloco);
            // await _context.SaveChangesAsync();
            return newBloco;
        }
    }
}