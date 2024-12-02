using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly CommonDbContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsHostRequirementHandler(CommonDbContext dbContext,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            /* And when we're getting our attendee object from entity framework, this is tracking the entity that we're getting.
            And this stays in memory, even though our handler will have been disposed of because it's a transient, it doesn't mean that the entity that we've obtained from entity framework is also going to be disposed.
            This is staying in memory and it's causing a problem when we're editing an activity because we're only sending up the activity object.
            And in our edit class we're not getting the related entity and we've got an activity attendees object inside memory for that particular activity.
            Is that combination of things that is making our activity, our activity attendees disappear from the list. */
            var attendee = _dbContext.ActivityAttendees
                .AsNoTracking() // this is needed since we are going to register the IsHostRequirementHandler as transient
                .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId)
                .Result;

            if (attendee == null) return Task.CompletedTask;

            if (attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}