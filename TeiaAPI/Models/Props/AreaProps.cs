using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TeiaAPI.Models.Props
{
    [Table("area")]
    public class AreaProps
    {
        [Column("id")] 
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        [Column("valor")]
        [Display(Name="Valor")]
        public float valor { get; set; }

        [Column("tipo")]
        [Display(Name="Tipo")]
        public TipoAreaEnum TipoArea { get; set; }
        public enum TipoAreaEnum{
            Coberta= 1,
            Externa= 2,
            Terreno= 3
        }

        [JsonIgnore]
        public ICollection<ImovelModel>? Imoveis { get; set; }
    }
}