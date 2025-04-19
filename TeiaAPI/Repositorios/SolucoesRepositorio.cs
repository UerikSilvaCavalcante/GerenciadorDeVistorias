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
    public class SolucoesRepositorio : ISolucoesRepositorio
    {
        private readonly TeiaApiDBContext _context;
        public SolucoesRepositorio(TeiaApiDBContext context)
        {
            _context = context;
        }
        public async Task<int> AddSolucoes(SolucoesModel solucoes)
        {
            await _context.Solucoes.AddAsync(solucoes);
            await _context.SaveChangesAsync();
            return solucoes.Id;   
        }

        public async Task<bool> Delete(int id)
        {
            SolucoesModel solucoes = await GetSolucoesById(id);
            if (solucoes == null)
            {
                return false;
            }
            _context.Solucoes.Remove(solucoes);
            // await _context.SaveChangesAsync();
            return true;
        }

        public async Task<SolucoesModel> GetSolucoesById(int id)
        {
            return await _context.Solucoes.FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<SolucoesModel> Update(int id, SolucoesModel solucoes)
        {
            SolucoesModel? solucoesAtualizadas = await GetSolucoesById(id);
            if (solucoesAtualizadas == null)
            {
                return null;
            }
            solucoesAtualizadas.Agua = solucoes.Agua;
            solucoesAtualizadas.Esgoto = solucoes.Esgoto;
            solucoesAtualizadas.Energia = solucoes.Energia;
            solucoesAtualizadas.Pavimentacao = solucoes.Pavimentacao;
            solucoesAtualizadas.Iluminacao = solucoes.Iluminacao;
            solucoesAtualizadas.ColetaLixo = solucoes.ColetaLixo;
            solucoesAtualizadas.Creche = solucoes.Creche;
            solucoesAtualizadas.Escola = solucoes.Escola;
            solucoesAtualizadas.Saude = solucoes.Saude;
            solucoesAtualizadas.Lazer = solucoes.Lazer;
            solucoesAtualizadas.Comercio = solucoes.Comercio;
            solucoesAtualizadas.AbsGas = solucoes.AbsGas;
            solucoesAtualizadas.AguasPluviais = solucoes.AguasPluviais;
            solucoesAtualizadas.GuiasSarjetas = solucoes.GuiasSarjetas;
            solucoesAtualizadas.Seguranca = solucoes.Seguranca;
            _context.Solucoes.Update(solucoesAtualizadas);
            await _context.SaveChangesAsync();
            return solucoesAtualizadas;   
        }
    }
}