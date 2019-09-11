using GameStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace GameStore.Controllers {
    [Route("api/[controller]/[action]")]
    public class GetGamesController : Controller {
        GameStoreContext db;

        public GetGamesController(GameStoreContext context) {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Game> All() {
            return db.Games;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<Game> ForClient() {
            var ids = db.Purchases.Where(obj => obj.Account.Login == User.Identity.Name).Select(obj => obj.GameId);
            return db.Games.Where(obj => !ids.Contains(obj.Id));
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<Purchase> ClientPurchases() {
            return db.Purchases.Include(obj => obj.Game).Where(obj => obj.Account.Login == User.Identity.Name);
        }
    }
}
