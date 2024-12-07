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
        [Display(Name="Id")]
        public int Id { get; set; }

        //*Relacao many to many
        public ICollection<AreaProps>? AreaImovel { get; set; }
        
        [Column("Frente")]
        [Display(Name="Frente")]
        public float Frente { get; set; }
        // public enum Finalidade {get; set;}

        [Column("id_acabamento")]
        [Display(Name="IdAcabamento")]
        [ForeignKey("Acabamento")]
        public int? IdAcabamento { get; set; }
        public virtual AcabamentoModel? Acabamento { get; set; }

        [Column("id_divisao")] 
        [Display(Name="IdDivisao")]
        [ForeignKey("Divisao")] 
        public int? IdDivisao { get; set; }
        public virtual DivisaoModel? Divisao { get; set; }

        [Column("id_infraestrutura")]
        [Display(Name="IdInfraestrutura")]
        [ForeignKey("Infraestrutura")]
        public int? IdInfraestrura { get; set; }
        public virtual InfraestruturaModel? Infraestrutura { get; set; }

        public Telhado_enum? Telhado { get; set; }
        public enum Telhado_enum{
            fibrocimento = 1,
            ceramica = 2,
            barro = 3,
            concreto = 4,
            outro = 5
        }   

        
        
    }

}