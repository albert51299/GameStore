using GameStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GameStore.Controllers {
    [Route("api/[controller]")]
    public class LoginController {
        GameStoreContext db;

        public LoginController (GameStoreContext context) {
            db = context;
        }

        [HttpPost]
        public string Post([FromBody]Account account) {
            if (db.Accounts.FirstOrDefault(obj => (obj.Login == account.Login) && (obj.Password == account.Password)) != null) {
                return "ok";
            }
            return "Wrong login or password";
        }
    }
}
