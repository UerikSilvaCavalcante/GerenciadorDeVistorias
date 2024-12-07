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
    public class DivisaoRepositorio : IDivisaoRepositorio
    {
        private readonly TeiaApiDBContext _context;
       
        public DivisaoRepositorio(TeiaApiDBContext context)
        {
            _context = context;
        }
    
        public async Task<int> AddDivisao(DivisaoModel divisao, DivisaoModel.DivisaoManyToManyProps manyToManyProps)
        {
            divisao.Garagems = manyToManyProps.garagem;
            divisao.AreaServico = manyToManyProps.areaServico;
            divisao.Banheiros = manyToManyProps.banheiro;
            await _context.Divisoes.AddAsync(divisao);
            await _context.SaveChangesAsync();
            return divisao.Id;
        }

        private async Task ExcludeManyToManyProps(DivisaoModel divisaoAtualizada)
        {
            foreach(GaragemProps garagem in divisaoAtualizada.Garagems)
            {
                GaragemProps? garagemAtualizada = await _context.Garagens.FirstOrDefaultAsync(g => g.Id == garagem.Id);
                if (garagemAtualizada == null)
                {
                    continue;
                }
                _context.Garagens.Remove(garagemAtualizada);
                // await _context.SaveChangesAsync();
            }
            foreach(AreaServicoProps areaServico in divisaoAtualizada.AreaServico)
            {
                AreaServicoProps? areaServicoAtualizada = await _context.AreaServicos.FirstOrDefaultAsync(a => a.Id == areaServico.Id);
                if (areaServicoAtualizada == null)
                {
                    continue;
                }
                _context.AreaServicos.Remove(areaServicoAtualizada);
                // await _context.SaveChangesAsync();
            }
            foreach(BanheirosProps banheiro in divisaoAtualizada.Banheiros)
            {
                BanheirosProps? banheiroAtualizado = await _context.Banheiros.FirstOrDefaultAsync(b => b.Id == banheiro.Id);
                if (banheiroAtualizado == null)
                {
                    continue;
                }
                _context.Banheiros.Remove(banheiroAtualizado);
                // await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> Delete(int id)
        {
            DivisaoModel divisao = await GetDivisaoById(id);
            if (divisao == null)
            {
                return false;
            }
            await ExcludeManyToManyProps(divisao);
            _context.Divisoes.Remove(divisao);
            // await _context.SaveChangesAsync();
            return true;
        }

        public async Task<DivisaoModel> GetDivisaoById(int id)
        {
            return await _context.Divisoes
                .Include(d => d.Garagems)
                .Include(d => d.AreaServico)
                .Include(d => d.Banheiros)
                .FirstOrDefaultAsync(d => d.Id == id); 
        }

        public async Task<DivisaoModel> Update(int id, DivisaoModel divisao, DivisaoModel.DivisaoManyToManyProps manyToManyProps)
        {
            DivisaoModel divisaoAtualizada = await GetDivisaoById(id);
            if (divisaoAtualizada == null)
            {
                return null;
            }
            await ExcludeManyToManyProps(divisaoAtualizada);

            divisaoAtualizada.AreaServico = manyToManyProps.areaServico;
            divisaoAtualizada.Quartos = divisao.Quartos;
            divisaoAtualizada.Salas = divisao.Salas;
            divisaoAtualizada.Cozinhas = divisao.Cozinhas;
            divisaoAtualizada.Banheiros = manyToManyProps.banheiro;
            divisaoAtualizada.SacadaVaranda = divisao.SacadaVaranda;
            divisaoAtualizada.Garagems = manyToManyProps.garagem;
            divisaoAtualizada.Lavabos = divisao.Lavabos;
            divisaoAtualizada.ArCondicionado = divisao.ArCondicionado;
            divisaoAtualizada.Piscina = divisao.Piscina;
            divisaoAtualizada.Outros = divisao.Outros;
            _context.Divisoes.Update(divisaoAtualizada);
            await _context.SaveChangesAsync();
            return divisaoAtualizada;
        }
    }

    
}