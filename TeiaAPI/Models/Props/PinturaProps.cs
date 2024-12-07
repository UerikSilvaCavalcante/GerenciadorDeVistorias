using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeiaAPI.Models.Props
{
    [Table("pintura")]
    public class PinturaProps
    {
        [Column("id")]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("qtde")]
        [Display(Name = "Qtde")]
        public int Qtde { get; set; }

        [Column("tipo")]
        [Display(Name = "Tipo")]
        public TipoPinturaEnum TipoPintura { get; set; }
        public enum TipoPinturaEnum{
                Interna = 1,
                Externa = 2,
                Ambas = 3
            }

        [Column("estilo")]
        [Display(Name = "Estilo")]
        public EstiloEnum Estilo { get; set; }
        public enum EstiloEnum{
            Textura = 1,
            Grafiato = 2,
            Pintura = 3,
            Sem = 4
        }

        [JsonIgnore]
        public ICollection<AcabamentoModel>? Acabamentos { get; set; }
    }
}