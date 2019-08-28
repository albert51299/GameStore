using Microsoft.EntityFrameworkCore;
using System;
using System.IO;

namespace GameStore.Models {
    public class GameStoreContext : DbContext {
        public DbSet<Game> Games { get; set; }

        public GameStoreContext(DbContextOptions options) : base(options) {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            string base64 = @"data:image / jpeg; base64,";

            modelBuilder.Entity<Game>().HasData(
                new Game {
                    Id = 1,
                    Name = "Call of Duty 4",
                    Price = 400,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/CallOfDuty_4.jpg"))
                },
                new Game {
                    Id = 2,
                    Name = "Battlefield 3",
                    Price = 500,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/Battlefield_3.jpg"))
                });
        }
    }
}
