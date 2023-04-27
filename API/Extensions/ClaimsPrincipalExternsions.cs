using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExternsions
{
    public static string RetrieveEmailFromPricipal(this ClaimsPrincipal user)
    {
        // return user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        return user.FindFirstValue(ClaimTypes.Email);
    }
}