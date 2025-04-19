using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.enums.Vistoria;

namespace TeiaAPI.Models
{
    [Table("solucoes")]
    public class SolucoesModel
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("agua")]
        [Display(Name="Agua")]
        public SolucaoEnum Agua { get; set; }
        [Column("esgoto")]
        [Display(Name="Esgoto")]
        public SolucaoEnum Esgoto { get; set; }
        [Column("energia")]
        [Display(Name="Enegia")]
        public SolucaoEnum Energia { get; set; }
        [Column("pavimentacao")]
        [Display(Name="Pavimentacao")]
        public SolucaoEnum Pavimentacao { get; set; }

        [Column("aguas_pluviais")]
        [Display(Name="AguasPluviais")]
        public SolucaoEnum AguasPluviais { get; set; }

        [Column("guias_sarjetas")]
        [Display(Name="GuiasSarjetas")]
        public SolucaoEnum GuiasSarjetas { get; set; }
        
        [Column("iluminacao")]
        [Display(Name="Iluminacao")]
        public SolucaoEnum Iluminacao { get; set; }
        [Column("coleta_lixo")]
        [Display(Name="Coleta de Lixo")]
        public SolucaoEnum ColetaLixo { get; set; }
        [Column("creche")]
        [Display(Name="Creche")]
        public SolucaoEnum Creche { get; set; }
        [Column("escola")]
        [Display(Name="Escola")]
        public SolucaoEnum Escola { get; set; }
        [Column("saude")]
        [Display(Name="Saude")]
        public SolucaoEnum Saude { get; set; }
        

        [Column("seguranca")]
        [Display(Name="Seguranca")]
        public SolucaoEnum Seguranca { get; set; }

        [Column("lazer")]
        [Display(Name="Lazer")]
        public SolucaoEnum Lazer { get; set; }
        [Column("comercio")]
        [Display(Name="Comercio")]
        public SolucaoEnum Comercio { get; set; }
        [Column("abs_gas")]
        [Display(Name="AbsGas")]
        public SolucaoEnum AbsGas { get; set; }
        
    }

}