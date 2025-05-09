using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.enums.Vistoria;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Models
{
    [Table("imovel")]
    public class ImovelModel
    {
        [Column("id")]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        //*Relacao many to many
        public ICollection<AreaProps>? AreaImovel { get; set; }

        [Column("Frente")]
        [Display(Name = "Frente")]
        public float Frente { get; set; }
        // public enum Finalidade {get; set;}

        [Column("id_acabamento")]
        [Display(Name = "IdAcabamento")]
        [ForeignKey("Acabamento")]
        public int? IdAcabamento { get; set; }
        public virtual AcabamentoModel? Acabamento { get; set; }

        [Column("valor_imovel")]
        [Display(Name = "ValorImovel")]
        public float ValorImovel { get; set; }

        [Column("patologia")]
        [Display(Name = "Patologia")]
        public string? Patologia { get; set; }

        [Column("idade_imovel")]
        [Display(Name = "IdadeImovel")]    
        public int IdadeImovel { get; set; }

        [Column("id_divisao")]
        [Display(Name = "IdDivisao")]
        [ForeignKey("Divisao")]
        public int? IdDivisao { get; set; }
        public virtual DivisaoModel? Divisao { get; set; }

        [Column("id_infraestrutura")]
        [Display(Name = "IdInfraestrutura")]
        [ForeignKey("Infraestrutura")]
        public int? IdInfraestrura { get; set; }
        public virtual InfraestruturaModel? Infraestrutura { get; set; }

        public Telhado_enum? Telhado { get; set; }
        public enum Telhado_enum
        {
            fibrocimento = 1,
            ceramica = 2,
            barro = 3,
            concreto = 4,
            outro = 5
        }

        public enum TipoSituacao
        {
            MeioDeQuadra = 1,
            Esquina = 2,
        }

        [Column("situacao")]
        [Display(Name = "Situacao")]
        public TipoSituacao Situacao { get; set; }

        public enum TipoDoImovelEnum{
            Residencial = 1,
            Comercial = 2,
            Industrial = 3,
            Rural = 4,
            Outro = 5
        }

        [Column("tipo_do_imovel")]
        [Display(Name = "TipoDoImovel")]
        public TipoDoImovelEnum TipoDoImovel { get; set; }

        public enum TipoCotaGreide
        {
            acima = 1,
            nivelado = 2,
            abaixo = 3
        }

        [Column("cota_greide")]
        [Display(Name = "CotaGreide")]
        public TipoCotaGreide CotaGreide { get; set; }

        [Column("posicao_unidade")]
        [Display(Name = "PosicaoUnidade")]
        public string? PosicaoUnidade { get; set; }
    }

}