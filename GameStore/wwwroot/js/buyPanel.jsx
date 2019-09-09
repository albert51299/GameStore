import ConfirmBuyForm from "./confirmBuyForm.jsx";

class BuyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { games: [], currentGame: {} };
        this.changeGame = this.changeGame.bind(this);
    }

    loadData() {
        fetch("/api/GameStore")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
    }

    componentDidMount() {
        this.loadData();
    }

    changeGame(game) {
        this.setState({ currentGame: game });
    }

    render() {
        return (
        <div>
            <div className={((this.props.isLoginState === true) || (this.props.showPurchases === true) 
                || (this.props.confirmBuy === true)) ? "Hide" : "NotHide"}>
                {
                    this.state.games.map( function(game) { 
                        return <Game key={game.id} game={game} 
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
                <input className="BuyBtn" type="button" value="Buy" onClick={this.buyHandler}></input>
            </div>
        );
    }
}

export default BuyPanel;
