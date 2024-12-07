using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TeiaAPI.Models
{
    [Table("infraestrutura")]
    public class InfraestruturaModel
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        [Column("rede_agua")]
        [Display(Name="RedeAgua")]
        public bool RedeAguaP { get; set; }
        [Column("rede_esgoto")]
        [Display(Name="RedeEsgoto")]
        public bool RedeEsgoto { get; set; }

        [Column("iluminacao")]
        [Display(Name="Iluminacao")]
        public bool Iluminacao { get; set; }

        [Column("pavimentacao")]
        [Display(Name="Pavimentacao")]
        public bool Pavimentacao { get; set; }

        [Column("fossa")]
        [Display(Name="Fossa")]
        public bool Fossa { get; set; }

        [Column("sumidouro")]
        [Display(Name="Sumidouro")]
        public bool Sumidouro { get; set; }

    }
}