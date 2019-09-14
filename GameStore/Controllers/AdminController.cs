using GameStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Controllers {
    [Route("api/[controller]/[action]")]
    public class AdminController : Controller {
        GameStoreContext db;

        public AdminController(GameStoreContext context) {
            db = context;
        }

        [HttpPost]
        public string Add([FromBody]Game game) {
            db.Games.Add(game);
            db.SaveChanges();
            return "ok";
        }

        [HttpPost]
        public string Update([FromBody]Game game) {
            db.Entry(game).State = EntityState.Modified;
            db.SaveChanges();
            return "ok";
        }
    }
}
