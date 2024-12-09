using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Models;
using TeiaAPI.enums.User;

namespace TeiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepositorio _userRepositorio;
        public UserController(IUserRepositorio userRepositorio)
        {   
            _userRepositorio = userRepositorio;    
        }


        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> GetAllUser()
        {
            try{
                List<UserModel> users = await _userRepositorio.GetAllUser();

                return Ok(users);
        }   catch (Exception e)
            {
                return BadRequest(e.Message);
            }   
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserById(int id)
        {
            try
            {
                UserModel user = await _userRepositorio.GetUserById(id);
                
                return Ok(new { User = new{
                    Id = user.Id,
                    Name = user.Name,
                    UserName = user.UserName,
                    Type = Enum.GetName(typeof(TypeUserEnum), user.Type),
                    Status = Enum.GetName(typeof(StatusEnum), user.Status),
                    Password= user.Password
                }
                });
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUser([FromBody] UserModel user)
        {
            try
            {   
                UserModel newUser = await _userRepositorio.PostUser(user);
                return Ok(newUser);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserModel>> PutUser([FromBody] UserModel user, int id)
        {
            try
            {
                user.Id = id;
                UserModel updatedUser = await _userRepositorio.PutUser(user, id);
                return Ok(updatedUser);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            try
            {
                bool deletedUser = await _userRepositorio.DeleteUser(id);
                return Ok(deletedUser);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }	
    }
}