using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Data;
using TeiaAPI.Models;
using TeiaAPI.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Repositorios
{
    public class ImovelRepositorio : IimovelRepositorio
    {
        private readonly TeiaApiDBContext _context;
        private readonly IAcabamentoRepositorio _acabamentoRepositorio;
        private readonly IInfraestruturaRepositorio _infraestruturaRepositorio;
        private readonly IDivisaoRepositorio _divisaoRepositorio;

        public ImovelRepositorio(TeiaApiDBContext context, IAcabamentoRepositorio acabamentoRepositorio, IInfraestruturaRepositorio infraestruturaRepositorio, IDivisaoRepositorio divisaoRepositorio)
        {
            _context = context;
            _acabamentoRepositorio = acabamentoRepositorio;
            _infraestruturaRepositorio = infraestruturaRepositorio;
            _divisaoRepositorio = divisaoRepositorio;
        }
        public async Task<int> AddImovel(ImovelModel imovel)//, VistoriadorModel.VistoriadorProps vistoriador)
        {
            int acabamentoId = await _acabamentoRepositorio.AddAcabamento(imovel.Acabamento);//, vistoriador.acabamentoProps);
            int divisaoId = await _divisaoRepositorio.AddDivisao(imovel.Divisao);//, vistoriador.divisaoProps);
            int infraestruturaId = await _infraestruturaRepositorio.AddInfraestrutura(imovel.Infraestrutura);


            imovel.IdDivisao = divisaoId;
            imovel.IdInfraestrura = infraestruturaId;
            //imovel.AreaImovel = vistoriador.areas;
            imovel.IdAcabamento = acabamentoId;
            await _context.Imoveis.AddAsync(imovel);
            await _context.SaveChangesAsync();
            return imovel.Id;
        }

        public async Task<bool> Delete(int id)
        {
            ImovelModel imovel = _context.Imoveis.Include(i => i.AreaImovel).FirstOrDefault(i => i.Id == id);
            if (imovel == null)
            {
                return false;
            }

            foreach (AreaProps area in imovel.AreaImovel)
            {
                AreaProps? areaAtualizada = await _context.Areas.FirstOrDefaultAsync(a => a.Id == area.Id);
                if (areaAtualizada == null)
                {
                    continue;
                }
                _context.Areas.Remove(areaAtualizada);
                // await _context.SaveChangesAsync();
            }
            await _acabamentoRepositorio.Delete((int)imovel.IdAcabamento);
            await _divisaoRepositorio.Delete((int)imovel.IdDivisao);
            await _infraestruturaRepositorio.Delete((int)imovel.IdInfraestrura);
            _context.Imoveis.Remove(imovel);
            // await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ImovelModel> Update(int id, ImovelModel imovel)//, VistoriadorModel.VistoriadorProps vistoriador)
        {
            ImovelModel imovelAtualizado = await _context.Imoveis.Include(i => i.AreaImovel).FirstOrDefaultAsync(x => x.Id == id);
            if (imovelAtualizado == null)
            {
                return null;
            }
            foreach (AreaProps area in imovelAtualizado.AreaImovel)
            {
                AreaProps? areaAtualizada = await _context.Areas.FirstOrDefaultAsync(a => a.Id == area.Id);
                if (areaAtualizada == null)
                {
                    continue;
                }
                _context.Areas.Remove(areaAtualizada);
                await _context.SaveChangesAsync();
            }

            //imovelAtualizado.AreaImovel = vistoriador.areas;
            imovelAtualizado.AreaImovel = imovel.AreaImovel;
            imovelAtualizado.Frente = imovel.Frente;
            imovelAtualizado.Telhado = imovel.Telhado;
            AcabamentoModel acabamentoAtualizado = await _acabamentoRepositorio.Update((int)imovelAtualizado.IdAcabamento, imovel.Acabamento);//, vistoriador.acabamentoProps);
            DivisaoModel divisaoAtualizada = await _divisaoRepositorio.Update((int)imovelAtualizado.IdDivisao, imovel.Divisao);//, vistoriador.divisaoProps);
            InfraestruturaModel infraestruturaAtualizada = await _infraestruturaRepositorio.Update((int)imovelAtualizado.IdInfraestrura, imovel.Infraestrutura);
            imovelAtualizado.IdAcabamento = acabamentoAtualizado.Id;
            imovelAtualizado.IdDivisao = divisaoAtualizada.Id;
            imovelAtualizado.IdInfraestrura = infraestruturaAtualizada.Id;
            _context.Imoveis.Update(imovelAtualizado);
            await _context.SaveChangesAsync();
            return imovelAtualizado;
        }


    }
}