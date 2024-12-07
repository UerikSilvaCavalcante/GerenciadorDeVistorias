using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TeiaAPI.Models.Props
{
    [Table("area_servico")]
    
    public class AreaServicoProps
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        [Column("qtde")]
        [Display(Name="Qtde")]
        public int Qtde { get; set; }

        [Column("tipo")]
        [Display(Name="Tipo")]
        public TipoAreaServicoEnum Tipo { get; set; }
        public enum TipoAreaServicoEnum { Interna = 1, Externa = 2}
        [JsonIgnore]
        public ICollection<DivisaoModel>? Divisoes { get; set; }
    }
}