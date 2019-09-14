using GameStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace GameStore.Controllers {
    [Route("api/[controller]/[action]")]
    public class BuyController : Controller {
        GameStoreContext db;

        public BuyController(GameStoreContext context) {
            db = context;
        }

        [HttpGet]
        [Authorize]
        public string GetBalance(int enteredSum) {
            Account account = db.Accounts.FirstOrDefault(obj => obj.Login == User.Identity.Name);
            return account.Balance.ToString();
        }

        [HttpGet]
        [Authorize]
        public string ReplenishBalance(int enteredSum) {
            Account account = db.Accounts.FirstOrDefault(obj => obj.Login == User.Identity.Name);
            account.Balance += enteredSum;
            db.Entry(account).State = EntityState.Modified;
            db.SaveChanges();
            return "ok";
        }

        [HttpGet]
        [Authorize]
        public string BuyGame(int id) {
            Account account = db.Accounts.FirstOrDefault(obj => obj.Login == User.Identity.Name);
            Purchase purchase = new Purchase { GameId = id, AccountId = account.Id, LicenceKey = GetLicenceKey() };
            Game game = db.Games.FirstOrDefault(obj => obj.Id == id);
            account.Balance -= game.Price;
            db.Entry(account).State = EntityState.Modified;
            db.Purchases.Add(purchase);
            db.SaveChanges();
            return "ok";
        }

        private string GetLicenceKey() {
            Random random = new Random();
            string key = "";
            for (int i = 0; i < 5; i++) {
                for (int j = 0; j < 4; j++) {
                    if (random.Next(0, 2) == 0) {
                        key += random.Next(0, 10);
                    }
                    else {
                        key += Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                    }
                }
                if (i != 4) {
                    key += "-";
                }
            }
            return key;
        }
    }
}
