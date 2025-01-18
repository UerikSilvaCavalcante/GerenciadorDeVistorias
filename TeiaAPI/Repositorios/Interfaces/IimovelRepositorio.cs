using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IimovelRepositorio
    {
        
        public Task<int> AddImovel(ImovelModel imovel); //VistoriadorModel.VistoriadorProps vistoriador);
        public Task<bool> Delete(int id);
        public Task<ImovelModel> Update(int id, ImovelModel imovel);//, VistoriadorModel.VistoriadorProps vistoriador);
    }
}