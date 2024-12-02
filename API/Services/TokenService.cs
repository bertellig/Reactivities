using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            };

            /*
            a symmetric security key is when we encode this key
            or when we encrypt this key, the same key that we use to encrypt it is also used to decrypt it.
            The other type of security key is an asymmetric security key.
            And you would see that used with Https and SSL certificates because the server will encrypt it, but
            then it's decrypted with a public key.
            So as a public and private key system with asymmetric security, but symmetric security is when the
            same key is used for encryption and decryption.
            And what I'm saying here is that this key has to be kept securely on the server and it must never leave
            the server.
            Otherwise anybody would be able to create a token for any user because we rely on this for validating
            our token.
            So we're going to create that new symmetric security key.
            */
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}