class AddGameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", price: "", image: "",
            emptyName: false, incorrectPrice: false, noImage: false };

        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onPriceChanged = this.onPriceChanged.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    add() {
        this.setState({ emptyName: false, incorrectPrice: false, noImage: false });

        if ((this.state.name === "") || isNaN(+this.state.price) || (+this.state.price < 1) || (this.state.image === "")) {
            if (this.state.name === "") {
                this.setState({ emptyName: true });
            }
            if (isNaN(+this.state.price) || (+this.state.price < 1)) {
                this.setState({ incorrectPrice: true });
            }
            if (this.state.image === "") {
                this.setState({ noImage: true });
            }
        }
        else {
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
                    <div className={this.state.emptyName ? "Message" : "Hide"}>Empty name</div>
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" value={this.state.price} onChange={this.onPriceChanged}></input>
                    <div className={this.state.incorrectPrice ? "Message" : "Hide"}>Incorrect price</div>
                </div>
                <div>
                    <label>Upload image here</label>
                    <br/>
                    <input type="file" accept="image/png, image/jpeg" onChange={this.onImageChanged}></input>
                    <div className={this.state.noImage ? "Message" : "Hide"}>No loaded image</div>
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
