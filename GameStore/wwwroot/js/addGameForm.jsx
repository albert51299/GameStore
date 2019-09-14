class AddGameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", price: "", image: "" };

        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onPriceChanged = this.onPriceChanged.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    add() {
        let data = JSON.stringify({ "name":this.state.name, "price":this.state.price, "image":this.state.image });

        fetch("/api/Admin/Add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                if (data === "ok") {
                    this.props.loadGames();
                    this.props.changeAddGameState(false);
                }
            });
    }

    cancel() {
         this.props.changeAddGameState(false);
    }

    onNameChanged(e) {
         this.setState({ name: e.target.value });
    }

    onPriceChanged(e) {
        this.setState({ price: e.target.value });
    }

    onImageChanged(e) {
        const file = e.target.files[0];

        return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
            this.setState({ image: reader.result });
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsDataURL(file);
        });
    }

    render() {
         return (
            <div>
                <div>
                    <label>Name</label>
                    <input type="text" value={this.state.name} onChange={this.onNameChanged}></input>
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" value={this.state.price} onChange={this.onPriceChanged}></input>
                </div>
                <div>
                    <label>Upload image</label>
                    <br/>
                    <input type="file" accept="image/png, image/jpeg" onChange={this.onImageChanged}></input>
                </div>
                <img src={this.state.image} className="Image"/>
                <br/>
                <input type="button" className="GrayBtn" value="Add" onClick={this.add}></input>
                <input type="button" className="GrayBtn" value="Cancel" onClick={this.cancel}></input>
            </div>
         );
    }
}

export default AddGameForm;
