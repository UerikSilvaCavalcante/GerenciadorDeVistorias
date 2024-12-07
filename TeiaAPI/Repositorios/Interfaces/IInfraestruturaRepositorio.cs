using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IInfraestruturaRepositorio
    {
        public Task<InfraestruturaModel> GetInfraestruturaById(int id);
        public Task<int> AddInfraestrutura(InfraestruturaModel infraestrutura);
        public Task<bool> Delete(int id);
        public Task<InfraestruturaModel> Update(int id, InfraestruturaModel infraestrutura);
    }
}