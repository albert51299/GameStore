using Microsoft.EntityFrameworkCore;
using System;
using System.IO;

namespace GameStore.Models {
    public class GameStoreContext : DbContext {
        public DbSet<Game> Games { get; set; }
        public DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Purchase> Purchases { get; set; }

        public GameStoreContext(DbContextOptions options) : base(options) {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            string base64 = @"data:image / jpeg; base64,";

            modelBuilder.Entity<Game>().HasData(
                new Game {
                    Id = 1,
                    Name = "Call of Duty 4",
                    Price = 420,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/CallOfDuty_4.jpg"))
                },
                new Game {
                    Id = 2,
                    Name = "Battlefield 3",
                    Price = 490,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/Battlefield_3.jpg"))
                },
                new Game {
                    Id = 3,
                    Name = "Battlefield 4",
                    Price = 1200,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/Battlefield_4.jpg"))
                }, new Game {
                    Id = 4,
                    Name = "Battlefield 1",
                    Price = 1500,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/Battlefield_1.png"))
                }, new Game {
                    Id = 5,
                    Name = "Battlefield 5",
                    Price = 2500,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/Battlefield_5.jpg"))
                }, new Game {
                    Id = 6,
                    Name = "Battlefield: Bad Company 2",
                    Price = 450,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/BattlefieldBadCompany_2.jpg"))
                }, new Game {
                    Id = 7,
                    Name = "Call of Duty: Modern Warfare 2",
                    Price = 380,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/CallOfDutyMW_2.jpg"))
                }, new Game {
                    Id = 8,
                    Name = "Counter-Strike: Global Offensive",
                    Price = 440,
                    Image = base64 + Convert.ToBase64String(File.ReadAllBytes("wwwroot/Images/CSGO.jpg"))
                });

            modelBuilder.Entity<AccountType>().HasData(
                new AccountType { Id = 1, Type = "Admin" },
                new AccountType { Id = 2, Type = "Client" }
                );
        }
    }
}
