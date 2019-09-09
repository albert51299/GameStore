using GameStore.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GameStore.Controllers {
    [Route("api/[controller]")]
    public class LoginController : Controller {
        GameStoreContext db;

        public LoginController (GameStoreContext context) {
            db = context;
        }

        [HttpPost]
        public async Task<JsonResult> Post([FromBody]Account account) {
            var acc = db.Accounts.Include(obj => obj.AccountType)
                .FirstOrDefault(obj => (obj.Login == account.Login) && (obj.Password == account.Password));
            if (acc != null) {
                List<Claim> claims = new List<Claim> {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, acc.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, acc.AccountType.Type)
                };
                ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
                return Json(new LoginResponse { SignedIn = "true", Login = acc.Login, AccType = acc.AccountType.Type });
            }
            return Json(new LoginResponse { SignedIn = "false", Login = "", AccType = "" });
        }

        [HttpGet]
        public async Task<string> Get() {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return "ok";
        }
    }

    public class LoginResponse {
        public string SignedIn { get; set; }
        public string Login { get; set; }
        public string AccType { get; set; }
    }
}
