class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { games: [] };
    }

    loadData() {
        fetch("/api/GameStore")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
        <div className={this.props.isLoginState === true ? "Hide" : "NotHide"}>
            {
                this.state.games.map( function(game) { return <Game key={game.id} game={game} /> } )
            }
        </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: props.game};
    }

    render() {
        return (
            <div className="Game">
                <img src={this.state.data.image} className="Image"/>
                <p>{this.state.data.name}</p>
                <p className="RuPrice">Price: {this.state.data.price}</p>
                <div className="BuyBtn"><a href="">Buy</a></div>
            </div>
        );
    }
}

export default GameList;
