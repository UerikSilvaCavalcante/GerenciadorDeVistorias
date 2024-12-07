using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IDivisaoRepositorio
    {
        public Task<DivisaoModel> GetDivisaoById(int id);
        public Task<int> AddDivisao(DivisaoModel divisao, DivisaoModel.DivisaoManyToManyProps manyToManyProps);

        public Task<bool> Delete(int id);
        public Task<DivisaoModel> Update(int id, DivisaoModel divisao, DivisaoModel.DivisaoManyToManyProps manyToManyProps);
    }
}