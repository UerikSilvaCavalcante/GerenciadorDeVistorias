using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TeiaAPI.Models
{
    [Table("obra")]
    public class ObraModel
    {
        [Key]
        [Column("id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("servico")]
        [Display(Name = "Serviço")]
        public float Servico { get; set; }

        [Column("infraestrutura")]
        [Display(Name = "Infraestrutura")]
        public float Infraestrutura { get; set; }

        [Column("supra_estrutura")]
        [Display(Name = "Supraestrutura")]
        public float SupraEstrutura { get; set; }

        [Column("paredes")]
        [Display(Name = "Paredes")]
        public float Paredes { get; set; }

        [Column("esquadrias")]
        [Display(Name = "Esquadrias")]
        public float Esquadrias { get; set; }

        [Column("vidros_plasticos")]
        [Display(Name = "Vidros e Plásticos")]
        public float VidrosPlasticos { get; set; }

        [Column("cobertura")]
        [Display(Name = "Cobertura")]
        public float Cobertura { get; set; }

        [Column("impermeabilizacao")]
        [Display(Name = "Impermeabilização")]
        public float Impermeabilizacao { get; set; }

        [Column("revestimentos_internos")]
        [Display(Name = "Revestimentos Internos")]
        public float RevestimentosInternos { get; set; }

        [Column("revestimentos_externos")]
        [Display(Name = "Revestimentos Externos")]
        public float RevestimentosExternos { get; set; }

        [Column("forros")]
        [Display(Name = "Forros")]
        public float Forros { get; set; }

        [Column("pisos")]
        [Display(Name = "Pisos")]
        public float Pisos { get; set; }

        [Column("pintura")]
        [Display(Name = "Pintura")]
        public float Pinturas { get; set; }

        [Column("acabamentos")]
        [Display(Name = "Acabamentos")]
        public float Acabamentos { get; set; }

        [Column("instalacoes_eletricas")]
        [Display(Name = "Instalações Elétricas")]
        public float InstalacoesEletricas { get; set; }

        [Column("instalacoes_hidraulicas")]
        [Display(Name = "Instalações Hidráulicas")]
        public float InstalacoesHidraulicas { get; set; }

        [Column("instalacoes_esgoto")]
        [Display(Name = "Instalações Esgoto")]
        public float InstalacoesEsgoto { get; set; }

        [Column("locas_metais")]
        [Display(Name = "Louças e Metais")]
        public float LoucasMetais { get; set; }

        [Column("complementos")]
        [Display(Name = "Complementos")]
        public float Complementos { get; set; }

        [Column("outros")]
        [Display(Name = "Outros")]
        public string? Outros { get; set; }
    }
}