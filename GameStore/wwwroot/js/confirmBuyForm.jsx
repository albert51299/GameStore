class ConfirmBuyForm extends React.Component {
    constructor(props) {
        super(props);
        this.confirmHandler = this.confirmHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
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
            .then(data => console.log(data));
    }

    cancelHandler() {
        this.props.changeConfirmBuy(false);
    }

    render() {
        return (
            <div className={this.props.confirmBuy === true ? "Game" : "Hide"}>
                <img src={this.props.game.image} className="Image"/>
                <p>{this.props.game.name}</p>
                <p className="RuPrice">Price: {this.props.game.price}</p>
                <input className="GrayBtn" type="button" value="Confirm" onClick={this.confirmHandler}></input>
                <input className="GrayBtn" type="button" value="Cancel" onClick={this.cancelHandler}></input>
            </div>
        );
    }
}

export default ConfirmBuyForm;
