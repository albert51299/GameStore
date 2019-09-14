import AddGameForm from "./addGameForm.jsx";
import EditGameForm from "./editGameForm.jsx";

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { games: [], id: "", nameForEdit: "", priceForEdit: "", imageForEdit: "" };
        this.loadGames = this.loadGames.bind(this);
        this.changeId = this.changeId.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeImage = this.changeImage.bind(this);
    }

    loadGames() {
        fetch("/api/GetGames/All")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
    }

    componentDidMount() {
        this.loadGames();
    }

    changeGameForEdit(game) {
        this.setState({ gameForEdit: game });
    }

    changeId(value) {
        this.setState({ id: value });
    }

    changeName(value) {
        this.setState({ nameForEdit: value });
    }

    changePrice(value) {
        this.setState({ priceForEdit: value });
    }

    changeImage(value) {
        this.setState({ imageForEdit: value });
    }

    render () {
        return (
            <div>
                <div className={this.props.editGameState ? "Hide" : ""}>
                    { 
                        this.props.addGameState ? <AddGameForm changeAddGameState={this.props.changeAddGameState} loadGames={this.loadGames}/> : null
                    }
                    <div>
                        {
                            this.state.games.map( function(game) { 
                                return <EditableGame key={game.id} game={game} changeId={this.changeId}
                                    changeName={this.changeName} changePrice={this.changePrice} changeImage={this.changeImage}
                                    changeEditGameState={this.props.changeEditGameState}/> 
                            }, this)
                        }
                    </div>
                </div>
                {
                    this.props.editGameState ? <EditGameForm editGameState={this.props.editGameState} changeEditGameState={this.props.changeEditGameState}
                            nameForEdit={this.state.nameForEdit} priceForEdit={this.state.priceForEdit} imageForEdit={this.state.imageForEdit} 
                            changeName={this.changeName} changePrice={this.changePrice} changeImage={this.changeImage} 
                            id={this.state.id} loadGames={this.loadGames}/> : null
                }
            </div>
        );
    }
}

class EditableGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.game };
        this.editHandler = this.editHandler.bind(this);
    }

    editHandler() {
        this.props.changeId(this.state.data.id);
        this.props.changeName(this.state.data.name);
        this.props.changePrice(this.state.data.price);
        this.props.changeImage(this.state.data.image);
        this.props.changeEditGameState(true);
    }

    render() {
        return (
            <div className="Game">
                <img src={this.state.data.image} className="Image"/>
                <p>{this.state.data.name}</p>
                <p className="RuPrice">Price: {this.state.data.price}</p>
                <input className="EditBtn" type="button" value="Edit" onClick={this.editHandler}></input>
            </div>
        );
    }
}

export default AdminPanel;
