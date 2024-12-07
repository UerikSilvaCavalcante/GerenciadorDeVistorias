using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;



namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IApartamentoRepositorio
    {
        public Task<List<ApartamentoModel>> GetApartamentos();
        public Task<ApartamentoModel> GetApartamentoById(int id);
        public Task<ApartamentoModel> AddApartamento(ApartamentoModel apartamento);
        public Task<ApartamentoModel> UpdateApartamento(ApartamentoModel apartamento, int id);
        public Task<bool> Delete(int id);

    }
}