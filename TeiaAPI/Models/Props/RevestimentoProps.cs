using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeiaAPI.Models.Props
{
    [Table("revestimento")]
    public class RevestimentoProps
    {
        [Column("id")]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("tipo")]
        [Display(Name = "Tipo")]
        public TipoRevestimentoEnum TipoRevestimento { get; set; }
        public enum TipoRevestimentoEnum{
                Ceramica = 1,
                Porcelanato = 2,
                Laminado = 3,
                Madeira = 4,
                Cimento = 5,
                Sem = 6
            }

        [Column("local")]
        [Display(Name = "Local")]
        public LocalEnum Local { get; set; }
        public enum LocalEnum{
            Banheiro = 1,
            Cozinha = 2,
            Sala = 3,
            Quarto = 4,
            AreaServico = 5,
            Garagem = 6,
            Tanque = 7,
            Outros = 8
        }

        [JsonIgnore]
        public ICollection<AcabamentoModel>? Acabamentos { get; set; }
    }
}