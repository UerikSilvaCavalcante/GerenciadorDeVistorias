using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TeiaAPI.Models
{
    [Table("apartamento")]
    public class ApartamentoModel
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }
        
        [Column("andar")]
        [Display(Name="Andar")]
        public int Andar { get; set; }

        [Column("condominio_val")]
        [Display(Name="CondominioVal")]
        public float CondominioVal { get; set; }

        [Column("administradora")]
        [Display(Name="Administradora")]
        public string? Adminstradora { get; set; }

        [Column("tel_administradora")]
        [Display(Name="TelAdministradora")]
        public string? Tel_Administradora { get; set; }

        [Column("vista")]
        [Display(Name="Vista")]
        public VistaPanoramica Vista { get; set; }
        public enum VistaPanoramica {
            seminfluencia = 1,
            Desfavoravel = 2,
            Favoravel = 3,
        }

        public enum PosicaoEnum {
            Frente = 1,
            Fundos = 2,
            Lateral = 3,
            Interno = 4
        }
        [Column("posicao")]
        [Display(Name="Posicao")]
        public PosicaoEnum Posicao_ { get; set; }

        [Column("identificacao_pav")]
        [Display(Name="IdentificacaoPav")]
        public string? IdentificacaoPav { get; set; }

        [Column("bloco_predio_id")]
        [Display(Name="BlocoPredioId")]

        [JsonIgnore]
        public int BlocoPredioId { get; set; }
        public virtual BlocoPredioModel? BlocoPredio { get; set; }
    }
}