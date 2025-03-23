using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Models;
using TeiaAPI.enums.User;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TeiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepositorio _userRepositorio;

        public LoginController(IUserRepositorio userRepositorio)
        {
            _userRepositorio = userRepositorio;
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> GetLogin([FromBody] LoginModel login)
        {

            UserModel user = await _userRepositorio.GetLogin(login.UserName);
            if (user == null)
            {
                return NotFound("Usuario não encontrado");
            }
            if (user.PasswordValid(login.Password))
            {
                var token = GetToken(user.Id, user.UserName, user.Type);
                return Ok(new { token });
            }
            else
            {
                return BadRequest("Senha incorreta");
            }
        }

        private string GetToken(int id, string userName, TypeUserEnum? tipo)
        {
            string secreteKey = "f3b0678a-7869-4b58-822b-a06a7c39c4d6";
            var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secreteKey));
            var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

            var claims = new[]{
                new Claim("id", id.ToString()),
                new Claim("userName", userName),
                new Claim("tipo", tipo.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "uerikToken",
                audience: "TEIA",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credenciais
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}