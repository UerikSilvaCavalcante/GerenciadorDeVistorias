using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface ISolucoesRepositorio
    {
        public Task<SolucoesModel> GetSolucoesById(int id);
        public Task<int> AddSolucoes(SolucoesModel solucoes);
        public Task<bool> Delete(int id);
        public Task<SolucoesModel> Update(int id, SolucoesModel solucoes);
    }
}