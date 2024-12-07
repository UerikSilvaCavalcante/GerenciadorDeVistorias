using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TeiaAPI.Models
{
    [Table("bloco_predio")]
    public class BlocoPredioModel
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        [Column("pavimentos")]
        [Display(Name="Pavimentos")]
        public int Pavimentos { get; set; }

        [Column("elevadores")]
        [Display(Name="Elevadores")]
        public int Elevadores { get; set; }

        [Column("idade")]
        [Display(Name="Idade")]
        public int Idade { get; set; }
        [Column("aptos_por_andar")]
        [Display(Name="AptosPorAndar")]
        public int AptosPorAndar { get; set; }
        [Column("unidades_predio")]
        [Display(Name="UnidadesPredio")]	
        public int UnidadesPredio { get; set; }

        [Column("subsolos")]
        [Display(Name="Subsolos")]
        public int Subsolos { get; set; }

        [Column("blocos")]
        [Display(Name="Blocos")]
        public int Blocos { get; set; }

        [Column("outros")]
        [Display(Name="Outros")]	
        public string? Outros { get; set; }
    }
}