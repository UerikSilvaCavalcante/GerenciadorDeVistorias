using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Data;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace TeiaAPI.Repositorios
{
    public class ObraRepositorio : IObraRepositorio
    {

        private readonly TeiaApiDBContext _context;
        public ObraRepositorio(TeiaApiDBContext context)
        {
            _context = context;
        }
        public async Task<ObraModel> AddObra(ObraModel obra)
        {
            await _context.Obras.AddAsync(obra);
            await _context.SaveChangesAsync();
            return obra;
        }

        public async Task<bool> DeleteObra(int id)
        {
            ObraModel obra = await Get(id);
            if (obra == null)
            {
                return false;
            }
            _context.Obras.Remove(obra);

            return true;

        }

        public async Task<ObraModel> Get(int id)
        {
            return await _context.Obras.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<ObraModel> UpdateObra(ObraModel obra, int id)
        {
            ObraModel existingObra = await Get(id);
            if (existingObra == null)
            {
                return null;
            }
            existingObra.Servico = obra.Servico;
            existingObra.Infraestrutura = obra.Infraestrutura;
            existingObra.SupraEstrutura = obra.SupraEstrutura;
            existingObra.Paredes = obra.Paredes;
            existingObra.Esquadrias = obra.Esquadrias;
            existingObra.VidrosPlasticos = obra.VidrosPlasticos;
            existingObra.Cobertura = obra.Cobertura;
            existingObra.Impermeabilizacao = obra.Impermeabilizacao;
            existingObra.RevestimentosInternos = obra.RevestimentosInternos;
            existingObra.RevestimentosExternos = obra.RevestimentosExternos;
            existingObra.Forros = obra.Forros;
            existingObra.Pisos = obra.Pisos;
            existingObra.Complementos = obra.Complementos;
            existingObra.Outros = obra.Outros;
            existingObra.LoucasMetais = obra.LoucasMetais;
            existingObra.InstalacoesEletricas = obra.InstalacoesEletricas;
            existingObra.InstalacoesHidraulicas = obra.InstalacoesHidraulicas;
            existingObra.InstalacoesEsgoto = obra.InstalacoesEsgoto;
            existingObra.Pinturas = obra.Pinturas;
            existingObra.Acabamentos = obra.Acabamentos;
            _context.Obras.Update(existingObra);
            await _context.SaveChangesAsync();
            return existingObra;
        }
    }
}