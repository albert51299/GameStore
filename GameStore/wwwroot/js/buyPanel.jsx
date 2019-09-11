import ConfirmBuyForm from "./confirmBuyForm.jsx";

class BuyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { games: [], currentGame: {} };
        this.changeGame = this.changeGame.bind(this);
    }

    loadAllGames() {
        fetch("/api/GetGames/All")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
    }

    loadGamesForClient() {
        fetch("/api/GetGames/ForClient")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
    }

    componentDidMount() {
        if (this.props.signedIn === "true") {
            this.loadGamesForClient();
        }
        else {
            this.loadAllGames();
        }
    }

    changeGame(game) {
        this.setState({ currentGame: game });
    }

    render() {
        return (
        <div>
            <div>
                {
                    this.state.games.map( function(game) { 
                        return <Game key={game.id} game={game} signedIn={this.props.signedIn}
                            changeGame={this.changeGame} changeConfirmBuy={this.props.changeConfirmBuy}/> 
                    }, this)
                }
            </div>
            <ConfirmBuyForm game={this.state.currentGame} 
                changeConfirmBuy={this.props.changeConfirmBuy} confirmBuy={this.props.confirmBuy}/>
        </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.game };
        this.buyHandler = this.buyHandler.bind(this);
    }

    buyHandler() {
        this.props.changeGame(this.state.data);
        this.props.changeConfirmBuy(true);
    }
    
    render() {
        return (
            <div className="Game">
                <img src={this.state.data.image} className="Image"/>
                <p>{this.state.data.name}</p>
                <p className="RuPrice">Price: {this.state.data.price}</p>
                <input className={this.props.signedIn === "true" ? "BuyBtn" : "Hide"} type="button" value="Buy" onClick={this.buyHandler}></input>
            </div>
        );
    }
}

export default BuyPanel;
