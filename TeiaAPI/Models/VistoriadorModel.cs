using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Models
{
    public class VistoriadorModel
    {
        public int Id { get; set; }

        public string? Name { get; set; }


        public struct VistoriadorProps
        {
            public int IdVistoria { get; set; }
            public DateTime DataVistoria { get; set; }
            public string URLImagens { get; set; }
            public string Latitude { get; set; }
            public string Longitude { get; set; }
            public string? Obs { get; set; }

            [JsonIgnore]
            public int IdImovel { get; set; }
            public ImovelModel Imovel { get; set; }

            public ApartamentoModel? Apartamento { get; set; }
            public ObraModel? Obra { get; set; }
            public LoteModel? Lote { get; set; }
            //public List<AreaProps> areas {get;set;}
            //public DivisaoModel.DivisaoManyToManyProps divisaoProps {get;set;} 
            //public AcabamentoModel.AcabamentoManyToManyProps acabamentoProps {get;set;}

        }
    }
}