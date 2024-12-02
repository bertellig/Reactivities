using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ApplicationUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        // public List<UserPhoto> Photos { get; set; }
        public ICollection<ActivityAttendee> Activities { get; set; }
        // public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}