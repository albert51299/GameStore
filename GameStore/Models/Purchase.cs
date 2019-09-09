namespace GameStore.Models {
    public class Purchase {
        public int Id { get; set; }
        public string LicenceKey { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }
    }
}
