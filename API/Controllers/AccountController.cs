using API.DTOs;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        public AccountController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result == true)
            {
                return new UserDto
                {
                    Username = user.UserName,
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = "this will be a token"
                };
            }
            return Unauthorized();
        }

    }
}