using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Models
{
    [Table("divisao")]
    public class DivisaoModel
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        //*Relacao many to many
        public ICollection<AreaServicoProps>? AreaServico { get; set; }

        [Column("quartos")]
        [Display(Name="Quartos")]
        public int Quartos { get; set; }

        [Column("salas")]
        [Display(Name="Salas")]
        public int Salas { get; set; }
        [Column("cozinhas")]
        [Display(Name="Cozinhas")]
        public int Cozinhas { get; set; }

        //*Relacao many to many
        public ICollection<BanheirosProps>? Banheiros { get; set; }

        [Column("sacada_varanda")]
        [Display(Name="SacadaVaranda")]
        public int SacadaVaranda { get; set; }

        //*Relacao many to many
        public ICollection<GaragemProps>? Garagems { get; set; }

        [Column("lavabos")]
        [Display(Name="Lavabos")]
        public int Lavabos { get; set; }

        [Column("ar_condicionado")]
        [Display(Name="ArCondicionado")]
        public int ArCondicionado { get; set; }
        [Column("piscina")]
        [Display(Name="Piscina")]
        public int Piscina { get; set; }
        [Column("Outros")]
        [Display(Name="Outros")]
        public string? Outros { get; set; }

        public struct DivisaoManyToManyProps
        {
            
            public List<GaragemProps> garagem {get;set;} 
            public List<AreaServicoProps> areaServico {get; set;} 
            public List<BanheirosProps> banheiro {get;set;} 
        }
    }
}