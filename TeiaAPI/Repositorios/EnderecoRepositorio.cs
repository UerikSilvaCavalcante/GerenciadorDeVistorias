using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Models;
using TeiaAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace TeiaAPI.Repositorios
{
    public class EnderecoRepositorio : IEnderecoRepositorio
    {   
        private readonly TeiaApiDBContext _context;
        public EnderecoRepositorio(TeiaApiDBContext context)
        {
            _context = context;
        }

        public async Task<EnderecoModel> Add(EnderecoModel endereco)
        {
            await _context.Enderecos.AddAsync(endereco);
            await _context.SaveChangesAsync();
            return endereco;
        }

        public async Task<EnderecoModel> Get(int id)
        {
            return await _context.Enderecos.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<bool> Delete(int id)
        {
            EnderecoModel endereco = await Get(id);
            if (endereco == null)
            {
                return false;
            }
            _context.Enderecos.Remove(endereco);
            // await _context.SaveChangesAsync();
            return true;
        }

        public async Task<EnderecoModel> Update(EnderecoModel endereco, int id)
        {
            EnderecoModel enderecoAtual = await Get(id);
            if (enderecoAtual == null)
            {
                return null;
            }
            enderecoAtual.Cep = endereco.Cep;
            enderecoAtual.Cidade = endereco.Cidade;
            enderecoAtual.Complemento = endereco.Complemento;
            enderecoAtual.Estado = endereco.Estado;
            enderecoAtual.Rua = endereco.Rua;
            enderecoAtual.Numero = endereco.Numero;
            enderecoAtual.Bairro = endereco.Bairro;
            enderecoAtual.TipoImovel = endereco.TipoImovel;
            _context.Enderecos.Update(enderecoAtual);
            await _context.SaveChangesAsync();
            return enderecoAtual;
        }
    }
}