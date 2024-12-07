using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeiaAPI.Models.Props
{
    [Table("banheiros")]
    public class BanheirosProps
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
        public TipoBanheiroEnum TipoBanheiro { get; set; }
        public enum TipoBanheiroEnum { Social = 1, Privado = 2, Empregada = 3}

        [JsonIgnore]
        public ICollection<DivisaoModel>? Divisoes { get; set; }
    }
}