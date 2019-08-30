class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { class: "Hide" };
        this.show = this.show.bind(this);
    }

    show() {
        this.setState({ class: "NotHide" });
    }

    render() {
        return ( 
            <div>
                <NavigationBar show={this.show}/>
                <br/>
                <LoginForm class={this.state.class}/>
                <GameList/>
            </div>
        );
    }
}

class NavigationBar extends React.Component {
    constructor(props){
        super(props);
        this.showLoginForm = this.showLoginForm.bind(this);
    }

    showLoginForm() {
        this.props.show();
    }

    render() {
        return (
            <ul className="NavigationBar">
                <li><input type="button" value="Home"></input></li>
                <li><input type="button" value="Login" onClick={this.showLoginForm}></input></li>
                <li><input type="button" value="About"></input></li>
            </ul>
        );
    }
}

/*class NavigationButton extends React.Component {
    constructor(props) {
        super(props);        
    }

    render() {
        return (

        );
    }
}*/

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className={this.props.class}>
                <div>
                    <label>Login</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"></input>
                </div>
                <div className="LoginFormBtns">
                    <input type="submit" value="Login"></input>
                    <input type="button" value="Registration"></input>
                </div>
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
                <p className="RuPrice">Price: {this.state.data.price}</p>
                <div className="BuyBtn"><a href="">Buy</a></div>
            </div>
        );
    }
}

ReactDOM.render(
    <Content />,
    document.getElementById("content")
);
