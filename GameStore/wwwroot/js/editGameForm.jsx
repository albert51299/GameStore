class EditGameForm extends React.Component {
    constructor(props) { 
        super(props);

        this.updateHandler = this.updateHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onPriceChanged = this.onPriceChanged.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    updateHandler() {
        let data = JSON.stringify({ "id":this.props.id, "name":this.props.nameForEdit, 
            "price":this.props.priceForEdit, "image":this.props.imageForEdit });

        fetch("/api/Admin/Update", {
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
                    this.props.changeEditGameState(false);
                }
            });
    }

    cancelHandler() {
        this.props.changeEditGameState(false);
    }

    onNameChanged(e) {
        this.props.changeName(e.target.value);
    }

    onPriceChanged(e) {
        this.props.changePrice(e.target.value);
    }

    onImageChanged(e) {
       const file = e.target.files[0];

       return new Promise((resolve, reject) => {
       const reader = new FileReader();

       reader.onload = (event) => {
           resolve(event.target.result);
           this.props.changeImage(reader.result);
       };

       reader.onerror = (err) => {
           reject(err);
       };

       reader.readAsDataURL(file);
       });
    }

    render() {
        return (
            <div className="Game">
                <img src={this.props.imageForEdit} className="Image"/>
                <br/>
                <input type="file" accept="image/png, image/jpeg" ></input>
                <br/>
                <input type="text" onChange={this.onNameChanged} value={this.props.nameForEdit}></input>
                <br/>
                <input type="text" onChange={this.onPriceChanged} value={this.props.priceForEdit}></input>
                <br/>
                <input className="GrayBtn" type="button" value="Update" onClick={this.updateHandler}></input>
                <input className="GrayBtn" type="button" value="Cancel" onClick={this.cancelHandler}></input>
            </div>
        );
    }
}

export default EditGameForm;
