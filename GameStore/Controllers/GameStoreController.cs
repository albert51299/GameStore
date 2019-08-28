using GameStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GameStore.Controllers {
    [Route("api/[controller]")]
    public class GameStoreController : Controller {
        GameStoreContext db;

        public GameStoreController(GameStoreContext context) {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Game> Get() {
            return db.Games;
        }
    }
}
