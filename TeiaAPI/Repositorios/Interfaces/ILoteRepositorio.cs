using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface ILoteRepositorio
    {
        public Task<int> Add(LoteModel lote);
        public Task<LoteModel> Get(int id);
        public Task<bool> Delete(int id);
        public Task<LoteModel> Update(LoteModel lote, int id);
    }
}