using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IObraRepositorio
    {
        public Task<ObraModel> AddObra(ObraModel obra);
        public Task<bool> DeleteObra(int id);
        public Task<ObraModel> Get(int id);
        public Task<ObraModel> UpdateObra(ObraModel obra, int id);
    }
}