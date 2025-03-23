using Microsoft.AspNetCore.Mvc;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Models;
using Microsoft.AspNetCore.Authorization;
using TeiaAPI.Helper;

namespace TeiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepositorio _userRepositorio;
        private readonly IEmail _email;
        public UserController(IUserRepositorio userRepositorio, IEmail email)
        {
            _userRepositorio = userRepositorio;
            _email = email;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> GetAllUser()
        {
            try
            {
                List<UserModel> users = await _userRepositorio.GetAllUser();

                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserById(int id)
        {
            try
            {
                UserModel user = await _userRepositorio.GetUserById(id);

                if (user != null)
                {
                    return Ok(
                        user
                    );
                }
                return NotFound("Usuario não encontrado!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUser([FromBody] UserModel user)
        {
            try
            {
                UserModel userExists = await _userRepositorio.GetLogin(user.UserName);
                if(userExists != null)
                {
                    return BadRequest("Usuario já cadastrado");
                }
                UserModel newUser = await _userRepositorio.PostUser(user);
                return Ok(newUser);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserModel>> PutUser([FromBody] UserModel user, int id)
        {
            try
            {
                user.Id = id;
                UserModel updatedUser = await _userRepositorio.PutUser(user, id);
                return Ok(updatedUser);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("SetCode/{id}")]
        public async Task<ActionResult<bool>> GetCode(int id)
        {
            try
            {
                // await _email.GetCodeForPassword();
                await _email.Enviar("turistajose1@gmail.com", "Recuperação de senha - TEIA");

                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPost("GetCode/{id}")]
        public async Task<ActionResult<bool>> GetCodeForPassword(int id, [FromBody] VerificationRequest request)
        {
            try
            {
                bool validCode = await _email.ValidCode(request.Email, request.Code);
                return Ok(validCode);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize]
        [HttpPut("UpdatePassword/{id}")]
        public async Task<ActionResult<bool>> UpdatePassword(int id, [FromBody] string password)
        {
            try
            {
                bool updatedPassword = await _userRepositorio.UpdatePassword(id, password);
                return Ok(updatedPassword);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            try
            {
                bool deletedUser = await _userRepositorio.DeleteUser(id);
                return Ok(deletedUser);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}