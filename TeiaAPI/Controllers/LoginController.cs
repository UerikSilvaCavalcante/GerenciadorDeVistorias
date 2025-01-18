using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Models;
using TeiaAPI.enums.User;

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

            Console.WriteLine(login.UserName);
            UserModel user = await _userRepositorio.GetLogin(login.UserName);
            if (user == null)
            {
                return NotFound("Usuario não encontrado");
            }
            if (user.PasswordValid(login.Password))
            {
                return Ok(new
                {
                    User = new
                    {
                        Id = user.Id,
                        Name = user.Name,
                        UserName = user.UserName,
                        Type = Enum.GetName(typeof(TypeUserEnum), user.Type),
                        Status = Enum.GetName(typeof(StatusEnum), user.Status),
                    }
                });


            }
            else
            {
                return BadRequest("Senha incorreta");
            }
        }
    }
}