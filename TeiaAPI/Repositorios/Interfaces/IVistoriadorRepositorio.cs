using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IVistoriadorRepositorio
    {
        public Task<List<VistoriaModel>> GetAllVistorias(int id);
        public Task<VistoriaModel> GetVistoriaById(int id, int idVistoria);
        public Task<VistoriaModel> AtualizarVistoria(VistoriadorModel.VistoriadorProps vistoria, int id);
    }
}