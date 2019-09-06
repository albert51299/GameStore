class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accountTypes: [], accType: "", login: "", password: "", loginAlreadyUsed: false }

        this.onAccTypeChanged = this.onAccTypeChanged.bind(this);
        this.onLoginChanged = this.onLoginChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.loginFormHandler = this.loginFormHandler.bind(this);
        this.homePageHandler = this.homePageHandler.bind(this);
    }

    resetState() {
        this.setState({ login: "", password: "", accType: "-", loginAlreadyUsed: false});
    }

    loadData() {
        fetch("/api/Registration")
            .then(response => response.json())
            .then(data => this.setState({ accountTypes: data }));
    }

    componentDidMount() {
        this.loadData();
    }

    onAccTypeChanged(e) {
        this.setState({ accType: e.target.value })
    }

    onLoginChanged(e) {
        this.setState({ login: e.target.value })
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let userType = this.state.accType;
        let userLogin = this.state.login;
        let userPassword = this.state.password;
        let userTypeId;

        // check fields for correct

        for (let item of this.state.accountTypes) {
            if (item.type === userType) {
                userTypeId = item.id;
            }
        }
        
        let data = JSON.stringify({ "login":userLogin, "password":userPassword, "balance":1000, "accountTypeId":userTypeId });
        
        fetch("/api/Registration", {
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
                    this.changeRegCompleted(true);
                    this.resetState();
                }
                else {
                    this.setState({ loginAlreadyUsed: true });
                } 
            }); 
    }

    loginFormHandler() {
        this.props.changeRegState(false);
        this.changeRegCompleted(false);
    }

    homePageHandler() {
        this.props.changeRegState(false);
        this.props.changeLoginState(false);
        this.changeRegCompleted(false);
    }

    changeRegCompleted(completed) {
        let regCompleted = document.getElementById("RegCompleted");
        let regForm = document.getElementById("RegForm");
        if (completed === true) {
            regCompleted.className = "NotHide";
            regForm.className = "Hide";
        }
        else {
            regCompleted.className = "Hide";
            regForm.className = "NotHide";
        }
    }

    render() {
        return (
            <div className={this.props.isRegState === true ? "NotHide" : "Hide"}>
                <form onSubmit={this.onSubmit} id="RegForm">
                    <div>
                        <label>Account type </label>
                        <select value={this.state.accType} onChange={this.onAccTypeChanged}>
                            <option>-</option>
                            {
                                this.state.accountTypes.map( function(accountType) { return <AccountType key={accountType.id} accountType={accountType}/> } )
                            }
                        </select>
                    </div>
                    <div>
                        <label>Login </label>
                        <input type="text" value={this.state.login} onChange={this.onLoginChanged}></input>
                        <div className={this.state.loginAlreadyUsed === false ? "Hide" : "Message"}>Login already used</div>
                    </div>
                    <div>
                        <label>Password </label>
                        <input type="password" value={this.state.password} onChange={this.onPasswordChanged}></input>
                    </div>
                    <input className="GrayBtn" type="submit" value="Registration"></input>
                </form>
                <div className="Hide" id="RegCompleted">
                    <h2>Account created</h2>
                    <input className="GrayBtn" type="button" value="Login form" onClick={this.loginFormHandler}></input>
                    <input className="GrayBtn" type="button" value="Home page" onClick={this.homePageHandler}></input>
                </div>
            </div>
        );
    }
}

class AccountType extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.accountType }
    }

    render() {
        return (
            <option>{this.state.data.type}</option>
        );
    }
}

export default RegistrationForm;