class Purchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = { purchases: [] };
    }

    loadPurchases() {
        fetch("/api/GetGames/ClientPurchases")
            .then(response => response.json())
            .then(data => this.setState({ purchases: data }));
    }

    componentDidMount() {
        this.loadPurchases();
    }

    render() {
        return (
            <div>
                {
                    this.state.purchases.map( function(purchase) { 
                        return <Purchase key={purchase.id} purchase={purchase} /> 
                    })
                }
            </div>
        );
    }
}

class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.purchase };
    }

    render() {
        return (
            <div className="Game">
                <img src={this.state.data.game.image} className="Image"/>
                <p>{this.state.data.game.name}</p>
                <p className="RuPrice">Price: {this.state.data.game.price}</p>
                <p className="LicenceKey">{this.state.data.licenceKey}</p>
            </div>
        );
    }
}

export default Purchases;
