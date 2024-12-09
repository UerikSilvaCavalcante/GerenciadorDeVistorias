using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.enums.Vistoria;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IEngenheiroRepositorio
    {
        public Task<List<VistoriaModel>> GetAllVistorias(int id, StatusVistoriaEnum? status = null, TypeEnum? tipoServico = null, DateTime? dataInicio = null, DateTime? dataFim = null, tipoImovelEnum? tipoImovel = null);
        public Task<VistoriaModel> AddVistoria(EngenheiroModel.EngenheiroProps vistoria);
        public Task<bool> DeleteVistoria(int id);
        public Task<VistoriaModel> GetVistoriaById(int id, int idEngenheiro);
        public Task<VistoriaModel> UpdateVistoria(int id, EngenheiroModel.EngenheiroProps engenheiroProps);
    }
}