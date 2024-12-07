using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeiaAPI.Models.Props
{
    [Table("garagem")]
    public class GaragemProps
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
        public TipoGaragemEnum TipoGaragem { get; set; }
        public enum TipoGaragemEnum { Coberta = 1, Descoberta = 2}

        [JsonIgnore]
        public ICollection<DivisaoModel>? Divisoes { get; set; }
    }
}