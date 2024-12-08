using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.enums.Vistoria;

namespace TeiaAPI.Models
{
    public class EngenheiroModel
    {
        public int Id { get; set; }
        public string? UserName { get; set; }

        public struct EngenheiroProps
        {
            public int IdEngenheiro { get; set; }
            public int IdVistoriador { get; set; }
            public EnderecoModel Endereco { get; set; }
            public long numOs { get; set; }
            public string? URLMatricula { get; set; }
            public string? URLImagens { get; set; }
            public DateTime DataAbertura { get; set; }
            public TypeEnum Tipo { get; set; }
            public string? Contratante { get; set; }
            public string? Tel_Contratante { get; set; }
            public string? Cliente { get; set; }
            public string? Latitude { get; set; }
            public string? Longitude { get; set; }
            public string? Obs { get; set; }
        }
    }
}