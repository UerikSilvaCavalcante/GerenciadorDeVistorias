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
    public class ApartamentoRepositorio : IApartamentoRepositorio
    {
        private readonly TeiaApiDBContext _context;
        private readonly IBlocoRepositorio _blocoRepositorio;
        public ApartamentoRepositorio(TeiaApiDBContext context, IBlocoRepositorio blocoRepositorio)
        {
            _context = context;
            _blocoRepositorio = blocoRepositorio;
        }
        public async Task<ApartamentoModel> AddApartamento(ApartamentoModel apartamento)
        {
            int blocoId = await _blocoRepositorio.AddBloco(apartamento.BlocoPredio);
            apartamento.BlocoPredioId = blocoId;
            await _context.Apartamentos.AddAsync(apartamento);
            await _context.SaveChangesAsync();
            return apartamento;
        }

        public async Task<ApartamentoModel> GetApartamentoById(int id)
        {
            ApartamentoModel? apartamento = await _context.Apartamentos
                .Include(apartamento => apartamento.BlocoPredio)
                .FirstOrDefaultAsync(apartamento => apartamento.Id == id);
            return apartamento;
        }

        public async Task<bool> Delete(int id)
        {
            ApartamentoModel apartamento = await _context.Apartamentos.Include(b => b.BlocoPredio).FirstOrDefaultAsync(apartamento => apartamento.Id == id);
            if (apartamento == null)
            {
                return false;
            }
            await _blocoRepositorio.Delete(apartamento.BlocoPredioId);
            _context.Apartamentos.Remove(apartamento);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<ApartamentoModel>> GetApartamentos()
        {
            return await _context.Apartamentos.ToListAsync();
        }

        public async Task<ApartamentoModel> UpdateApartamento(ApartamentoModel apartamento, int id)
        {
            ApartamentoModel? apartamentoToUpdate = await GetApartamentoById(id);
            if (apartamento == null)
            {
                return null;
            }
            else
            {
                apartamentoToUpdate.Andar = apartamento.Andar;
                apartamentoToUpdate.CondominioVal = apartamento.CondominioVal;
                apartamentoToUpdate.Adminstradora = apartamento.Adminstradora;
                apartamentoToUpdate.Tel_Administradora = apartamento.Tel_Administradora;
                apartamentoToUpdate.Vista = apartamento.Vista;
                apartamentoToUpdate.Posicao_ = apartamento.Posicao_;
                apartamentoToUpdate.IdentificacaoPav = apartamento.IdentificacaoPav;
                
                await _blocoRepositorio.Update(apartamentoToUpdate.BlocoPredioId, apartamento.BlocoPredio);
                _context.Apartamentos.Update(apartamentoToUpdate);
                await _context.SaveChangesAsync();
                return apartamentoToUpdate;
            }
        }
    }
}