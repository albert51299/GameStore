using GameStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameStore.Controllers {
    [Route("api/[controller]")]
    public class BuyController : Controller {
        GameStoreContext db;

        public BuyController(GameStoreContext context) {
            db = context;
        }

        [HttpGet]
        [Authorize]
        public string Get(int id) {
            // realization
            return "ok" + id.ToString();
        }
    }
}
