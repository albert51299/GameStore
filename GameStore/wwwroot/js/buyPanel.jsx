import ConfirmBuyForm from "./confirmBuyForm.jsx";

class BuyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { games: [], gameForAdd: {} };
        this.changeGameForAdd = this.changeGameForAdd.bind(this);
        this.loadGamesForClient = this.loadGamesForClient.bind(this);
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
        if (this.props.accType === "Client") {
            this.loadGamesForClient();
        }
        else {
            this.loadAllGames();
        }
    }

    changeGameForAdd(game) {
        this.setState({ gameForAdd: game });
    }

    render() {
        return (
        <div>
            <div className={this.props.confirmBuy ? "Hide" : "NotHide"}>
                {
                    this.state.games.map( function(game) { 
                        return <Game key={game.id} game={game} accType={this.props.accType}
                        changeGameForAdd={this.changeGameForAdd} changeConfirmBuy={this.props.changeConfirmBuy}/> 
                    }, this)
                }
            </div>
            <ConfirmBuyForm loadGamesForClient={this.loadGamesForClient} game={this.state.gameForAdd} 
                clientBalance={this.props.clientBalance} changeClientBalance={this.props.changeClientBalance}
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
        this.props.changeGameForAdd(this.state.data);
        this.props.changeConfirmBuy(true);
    }
    
    render() {
        return (
            <div className="Game">
                <img src={this.state.data.image} className="Image"/>
                <p>{this.state.data.name}</p>
                <p className="RuPrice">Price: {this.state.data.price}</p>
                <input className={this.props.accType === "Client" ? "BuyBtn" : "Hide"} type="button" value="Buy" onClick={this.buyHandler}></input>
            </div>
        );
    }
}

export default BuyPanel;
