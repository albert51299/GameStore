using GameStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace GameStore.Controllers {
    [Route("api/[controller]")]
    public class RegistrationController : Controller {
        GameStoreContext db;

        public RegistrationController(GameStoreContext context) {
            db = context;
        }

        [HttpGet]
        public IEnumerable<AccountType> Get() {
            return db.AccountTypes;
        }

        [HttpPost]
        public string Post([FromBody]Account account) {
            if (db.Accounts.FirstOrDefault(obj => obj.Login == account.Login) == null) {
                account.Balance = null;
                AccountType accountType = db.AccountTypes.FirstOrDefault(obj => obj.Id == account.AccountTypeId);
                if (accountType.Type == "Client") {
                    account.Balance = 2000;
                }
                db.Accounts.Add(account);
                db.SaveChanges();
                return "ok";
            }
            return "Login already used";
        }
    }
}
