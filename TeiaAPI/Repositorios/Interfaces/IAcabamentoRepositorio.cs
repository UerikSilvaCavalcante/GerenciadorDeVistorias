using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IAcabamentoRepositorio
    {
        public Task<AcabamentoModel> GetAcabamentoById(int id);
        public Task<int> AddAcabamento(AcabamentoModel acabamento); //AcabamentoModel.AcabamentoManyToManyProps manyToManyProps);

        public Task<bool> Delete(int id);
        public Task<AcabamentoModel> Update(int id, AcabamentoModel acabamento); //AcabamentoModel.AcabamentoManyToManyProps manyToManyProps);
    }
}