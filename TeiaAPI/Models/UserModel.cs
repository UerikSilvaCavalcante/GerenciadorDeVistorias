// Purpose: This file contains the model for the User object. This model is used to represent the User object in the database.
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TeiaAPI.enums.User;
using TeiaAPI.Helper;

namespace TeiaAPI.Models
{
    [Table("users")]
    public class UserModel
    {
        [Key]
        [Column("id")]
        [Display(Name="Id")]
        public int Id {get; set;}

        [Column("name")]
        [Display(Name="Name")]
        public string? Name {get; set;}

        [Column("username")]
        [Display(Name ="Username")]
        public string? UserName {get; set;}

        [Column("password")]
        [Display(Name="Password")]
        public string? Password {get; set;}

        [Column("type")]
        [Display(Name="Type")]
        public TypeUserEnum? Type {get;set;}

        [Column("email")]
        [Display(Name="Email")]
        public string? Email {get; set;}

        [Column("phone")]
        [Display(Name="Phone")]
        public string? Phone {get; set;}

        [Column("created_at")]
        [Display(Name="Created At")]
        // [DefaultValue("CURRENT_TIMESTAMP")]
        public DateTime? CreatedAt {get; set;}

        [Column("status")]
        [Display(Name="Status")]
        public StatusEnum? Status {get; set;}

        public bool PasswordValid(string password)
        {
            return this.Password == password.Encrypt();
        }

        public void SetPassword()
        {
            this.Password = this.Password.Encrypt();
        }

        public void SetCreated()
        {
            this.CreatedAt = DateTime.UtcNow;
        }

        public void SetNewPassword(string newPassword)
        {
            this.Password = newPassword.Encrypt();
        }
    }
}