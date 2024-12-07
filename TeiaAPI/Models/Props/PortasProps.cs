using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeiaAPI.Models.Props
{
    [Table("portas")]
    public class PortasProps
    {
        [Column("id")]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }
        [Column("loc")]
        [Display(Name = "Loc")]
        public LocEnum Loc { get; set; }

        public enum LocEnum {
                Interna = 1,
                Externa = 2
            }

        [Column("material")]
        [Display(Name = "Material")]
        public MaterialEnum Material { get; set; }
        public enum MaterialEnum{
            Madeira = 1,
            Ferro = 2,
            Aluminio = 3,
            Vidro = 4
        }
        [JsonIgnore]
        public ICollection<AcabamentoModel>? Acabamentos { get; set; }
    }
}