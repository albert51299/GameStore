class Content extends React.Component {
    render() {
        return ( 
        <div>
            <h2>Content</h2>
            <GameList />
        </div>
        );
    }
}

class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { games: [] };
    }

    loadData() {
        fetch("/api/gamestore")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
        <div>
            <h2>Game list</h2>
            <div>
                {
                    this.state.games.map(function(game) {
                        return <Game game={game} />
                    })
                }
            </div>
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
                <p>Price: {this.state.data.price}</p>
                <p/>
            </div>
        );
    }
}

ReactDOM.render(
    <Content />,
    document.getElementById("content")
);
