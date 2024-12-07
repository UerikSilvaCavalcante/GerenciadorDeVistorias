using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IEnderecoRepositorio
    {
        public Task<EnderecoModel> Get(int id);
        public Task<bool> Delete(int id);
        public Task<EnderecoModel> Add(EnderecoModel endereco);
        public Task<EnderecoModel> Update(EnderecoModel endereco, int id);
    }
}