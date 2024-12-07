using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TeiaAPI.Models
{
    [Table("lote")]
    public class LoteModel
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        [Column("solucoes_id")]
        [Display(Name="SolucoesId")]

        [JsonIgnore]
        public int SolucoesId { get; set; }
        public virtual SolucoesModel? Solucoes { get; set; }

        public enum TipoEnum{
            Unico = 1,
            Condominio = 2,
        }

        [Column("tipo")]
        [Display(Name="Tipo")]
        public TipoEnum Tipo { get; set; }

        public enum FormatoEnum {
            Quadrado = 1,
            Retangular = 2,
            Triangular = 3,
            Irregular = 4,
        }

        [Column("formato")]
        [Display(Name="Formato")]
        public FormatoEnum Formato { get; set; }

        public enum SitiacaoEnum{
            MeioDeQuadra = 1,
            Esquina = 2,
        }
        [Column("situacao")]
        [Display(Name="Situacao")]
        public SitiacaoEnum Situacao { get; set; }

        public enum TopografiaModelEnum{
            Plano = 1,
            Aclive = 2,
            Declive = 3,
            Aterro = 4,
        }
        [Column("topografia")]
        [Display(Name="Topografia")]
        public TopografiaModelEnum Topografia { get; set; }


        public enum UsoPredoEnum{
            Residencial = 1,
            Comercial = 2,
            Industrial = 3,
            Rural = 4,
            Misto = 5,
        }
        [Column("uso_predio")]
        [Display(Name="UsoPredio")]
        public UsoPredoEnum UsoPredio { get; set; }

        public enum AcabamentoEnum{
            Alto = 1,
            Normal = 2,
            Baixo = 3,
        }
        [Column("acabamento")]
        [Display(Name="Acabamento")]
        public AcabamentoEnum Acabamento { get; set; }

        [Column("densidade")]
        [Display(Name="Densidade")]
        public string? Densidade { get; set; }

        [Column("transporte_publico")]
        [Display(Name="TransportePublico")]
        public bool TransportePublico { get; set; }

    }
}