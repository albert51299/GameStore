class ConfirmBuyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isCompleted: false };
        this.confirmHandler = this.confirmHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.homeHandler = this.homeHandler.bind(this);
    }

    confirmHandler() {
        var url = "/api/Buy?id=" + this.props.game.id;
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data === "ok") {
                    this.setState({ isCompleted: true });
                    this.props.loadGamesForClient();
                }
            });
    }

    cancelHandler() {
        this.props.changeConfirmBuy(false);
    }

    homeHandler() {
        this.setState({ isCompleted: false });
        this.props.changeConfirmBuy(false);
    }

    render() {
        return (
            <div className={this.props.confirmBuy === true ? "Game" : "Hide"}>
                <div className={this.state.isCompleted ? "Hide" : "NotHide"}>
                    <img src={this.props.game.image} className="Image"/>
                    <p>{this.props.game.name}</p>
                    <p className="RuPrice">Price: {this.props.game.price}</p>
                </div>
                <h2 className={this.state.isCompleted ? "NotHide" : "Hide"}>Game buyed!</h2>
                <input className={this.state.isCompleted ? "Hide" : "GrayBtn"} type="button" value="Confirm" onClick={this.confirmHandler}></input>
                <input className={this.state.isCompleted ? "Hide" : "GrayBtn"} type="button" value="Cancel" onClick={this.cancelHandler}></input>
                <input className={this.state.isCompleted ? "GrayBtn" : "Hide"} type="button" value="Home page" onClick={this.homeHandler}></input>
            </div>
        );
    }
}

export default ConfirmBuyForm;
