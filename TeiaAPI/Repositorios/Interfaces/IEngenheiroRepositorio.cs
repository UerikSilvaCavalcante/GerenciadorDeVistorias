using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IEngenheiroRepositorio
    {
        public Task<List<VistoriaModel>> GetAllVistorias(int id);
        public Task<VistoriaModel> AddVistoria(EngenheiroModel.EngenheiroProps vistoria);
        public Task<bool> DeleteVistoria(int id);
        public Task<VistoriaModel> GetVistoriaById(int id, int idEngenheiro);
        public Task<VistoriaModel> UpdateVistoria(int id, EngenheiroModel.EngenheiroProps engenheiroProps);
    }
}