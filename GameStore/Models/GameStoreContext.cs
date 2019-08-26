using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameStore.Models {
    public class GameStoreContext : DbContext {
        public DbSet<Game> Games { get; set; }

        public GameStoreContext(DbContextOptions options) : base(options) {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Game>().HasData(
                new Game { Id = 1, Name = "Call of Duty 4", Price = 400 }, 
                new Game { Id = 2, Name = "Battlefield 3", Price = 500 });
        }
    }
}
