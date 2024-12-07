using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Data;
using Microsoft.EntityFrameworkCore;


namespace TeiaAPI.Repositorios
{
    public class InfraestruturaRepositorio : IInfraestruturaRepositorio
    {
        private readonly TeiaApiDBContext _context;
        public InfraestruturaRepositorio(TeiaApiDBContext context)
        {
            _context = context;
        }
    
        public async Task<InfraestruturaModel> GetInfraestruturaById(int id)
        {
           return await _context.Infraestruturas.FirstOrDefaultAsync(d => d.Id == id); 
        }

        public async Task<int> AddInfraestrutura(InfraestruturaModel infraestrutura)
        {
            await _context.Infraestruturas.AddAsync(infraestrutura);
            await _context.SaveChangesAsync();
            return infraestrutura.Id;
        }

        public async Task<bool> Delete(int id)
        {
            InfraestruturaModel infraestrutura = await GetInfraestruturaById(id);
            if (infraestrutura == null)
            {
                return false;
            }
            _context.Infraestruturas.Remove(infraestrutura);
            // await _context.SaveChangesAsync();
            return true;
        }

        public async Task<InfraestruturaModel> Update(int id, InfraestruturaModel infraestrutura)
        {
            InfraestruturaModel infraestruturaAtualizada = await GetInfraestruturaById(id);
            if (infraestruturaAtualizada == null)
            {
                return null;
            }
            infraestruturaAtualizada.Fossa = infraestrutura.Fossa;
            infraestruturaAtualizada.Iluminacao = infraestrutura.Iluminacao;
            infraestruturaAtualizada.Pavimentacao = infraestrutura.Pavimentacao;
            infraestruturaAtualizada.RedeAguaP = infraestrutura.RedeAguaP;
            infraestruturaAtualizada.RedeEsgoto = infraestrutura.RedeEsgoto;
            infraestruturaAtualizada.Sumidouro = infraestrutura.Sumidouro;
            _context.Infraestruturas.Update(infraestruturaAtualizada);
            await _context.SaveChangesAsync();
            return infraestruturaAtualizada;
        }
    }
}