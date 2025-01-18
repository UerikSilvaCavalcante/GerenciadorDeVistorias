using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Data;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.Models.Props;


namespace TeiaAPI.Repositorios
{
    public class AcabamentoRepositorio : IAcabamentoRepositorio
    {
        private readonly TeiaApiDBContext _context;

        public AcabamentoRepositorio(TeiaApiDBContext context )
        {
            _context = context;
            
        }
        public async Task<int> AddAcabamento(AcabamentoModel acabamento)//, AcabamentoModel.AcabamentoManyToManyProps manyToManyProps)
        {
            //acabamento.Pinturas = manyToManyProps.pintura;
            //acabamento.Revestimentos = manyToManyProps.revestimento;    
            //acabamento.Portas = manyToManyProps.portas;

            await _context.Acabamentos.AddAsync(acabamento);
            await _context.SaveChangesAsync();
            return acabamento.Id;
        }

        public async Task<AcabamentoModel> GetAcabamentoById(int id)
        {
            return await _context.Acabamentos
                .Include(x => x.Pinturas)
                .Include(x => x.Revestimentos)
                .Include(x => x.Portas)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        private async Task ExcludeManyToManyProps(AcabamentoModel acabamento)
        {
            foreach(PinturaProps pintura in acabamento.Pinturas)
            {
                PinturaProps? pinturaAtualizada = await _context.Pinturas.FirstOrDefaultAsync(p => p.Id == pintura.Id);
                if (pinturaAtualizada == null)
                {
                    continue;
                }
                _context.Pinturas.Remove(pinturaAtualizada);
                // await _context.SaveChangesAsync();
            }
            foreach(RevestimentoProps revestimento in acabamento.Revestimentos)
            {
                RevestimentoProps? revestimentoAtualizado = await _context.Revestimentos.FirstOrDefaultAsync(r => r.Id == revestimento.Id);
                if (revestimentoAtualizado == null)
                {
                    continue;
                }
                _context.Revestimentos.Remove(revestimentoAtualizado);
                // await _context.SaveChangesAsync();
            }
            foreach(PortasProps portas in acabamento.Portas)
            {
                PortasProps? portasAtualizado = await _context.Portas.FirstOrDefaultAsync(p => p.Id == portas.Id);
                if (portasAtualizado == null)
                {
                    continue;
                }
                _context.Portas.Remove(portasAtualizado);
                // await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> Delete(int id){
            AcabamentoModel acabamento = await GetAcabamentoById(id);
            if(acabamento == null){
                return false;
            }
            await ExcludeManyToManyProps(acabamento);
            _context.Acabamentos.Remove(acabamento);
            // await _context.SaveChangesAsync();
            return true;
        }

        public async Task<AcabamentoModel> Update(int id, AcabamentoModel acabamento)//, AcabamentoModel.AcabamentoManyToManyProps manyToManyProps)
        {
            AcabamentoModel acabamentoAtualizado = await GetAcabamentoById(id);
            if (acabamentoAtualizado == null)
            {
                return null;
            }

            await ExcludeManyToManyProps(acabamentoAtualizado);

            acabamentoAtualizado.Muro = acabamento.Muro;
            //acabamentoAtualizado.Pinturas = manyToManyProps.pintura;
            //acabamentoAtualizado.Portas = manyToManyProps.portas;
            acabamentoAtualizado.Piso = acabamento.Piso;
            acabamentoAtualizado.Janelas = acabamento.Janelas;
            acabamentoAtualizado.Bancada = acabamento.Bancada;
            //acabamentoAtualizado.Revestimentos = manyToManyProps.revestimento;
            acabamentoAtualizado.Padrao = acabamento.Padrao;
            acabamentoAtualizado.EstadoConservacao = acabamento.EstadoConservacao;
            acabamentoAtualizado.Teto = acabamento.Teto;
            _context.Acabamentos.Update(acabamentoAtualizado);
            await _context.SaveChangesAsync();
            return acabamentoAtualizado;
        }
    }
}