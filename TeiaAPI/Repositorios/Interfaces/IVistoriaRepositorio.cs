using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IVistoriaRepositorio
    {
        public Task<List<VistoriaModel>> GetAllVistoria(); 
        public Task<VistoriaModel> GetVistoriaById(int id);
        public Task<VistoriaModel> AddVistoria(VistoriaModel vistoria, VistoriadorModel.VistoriadorProps vistoriaProps);
        public Task<bool> DeleteVistoria(int id, int idEngenheiro);
    }
}