class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accountTypes: [], accType: "", login: "", password: "", confirmPassword: "", 
            loginAlreadyUsed: false, emptyLogin: false, emptyPassword: false, emptyConfirmPassword: false, emptyAccType: false,
            differentPasswords: false };

        this.onAccTypeChanged = this.onAccTypeChanged.bind(this);
        this.onLoginChanged = this.onLoginChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onConfirmPasswordChanged = this.onConfirmPasswordChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.loginFormHandler = this.loginFormHandler.bind(this);
        this.homePageHandler = this.homePageHandler.bind(this);
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
        this.setState({ accType: e.target.value });
    }

    onLoginChanged(e) {
        this.setState({ login: e.target.value });
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    onConfirmPasswordChanged(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({ loginAlreadyUsed: false, emptyLogin: false, emptyPassword: false, emptyConfirmPassword: false, emptyAccType: false,
            differentPasswords: false });

        if ((this.state.login === "") || (this.state.password === "") || (this.state.confirmPassword === "") 
            || (this.state.accType === "") || (this.state.accType === "-") || (this.state.confirmPassword !== this.state.password)) {
                if (this.state.login === "") {
                    this.setState({ emptyLogin: true });
                }
                if (this.state.password === "") {
                    this.setState({ emptyPassword: true });
                }
                if (this.state.confirmPassword === "") {
                    this.setState({ emptyConfirmPassword: true });
                }
                if ((this.state.accType === "") || (this.state.accType === "-")) {
                    this.setState({ emptyAccType: true });
                }
                if (this.state.confirmPassword !== this.state.password) {
                    this.setState({ differentPasswords: true });
                }
        }
        else {
            let accTypeId;

            for (let item of this.state.accountTypes) {
                if (item.type === this.state.accType) {
                    accTypeId = item.id;
                }
            }

            let data = JSON.stringify({ "login":this.state.login, "password":this.state.password, "accountTypeId":accTypeId });
        
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
                    }
                    else {
                        this.setState({ loginAlreadyUsed: true });
                    } 
                }); 
        }
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
            <div>
                <form onSubmit={this.onSubmit} id="RegForm">
                    <div>
                        <label>Account type </label>
                        <select value={this.state.accType} onChange={this.onAccTypeChanged}>
                            <option>-</option>
                            {
                                this.state.accountTypes.map( function(accountType) { return <AccountType key={accountType.id} accountType={accountType}/> } )
                            }
                        </select>
                        <div className={this.state.emptyAccType ? "Message" : "Hide"}>Empty account type</div>
                    </div>
                    <div>
                        <label>Login </label>
                        <input type="text" value={this.state.login} onChange={this.onLoginChanged}></input>
                        <div className={this.state.emptyLogin ? "Message" : "Hide"}>Empty login field</div>
                        <div className={this.state.loginAlreadyUsed ? "Message" : "Hide"}>Login already used</div>
                    </div>
                    <div>
                        <label>Password </label>
                        <input type="password" value={this.state.password} onChange={this.onPasswordChanged}></input>
                        <div className={this.state.emptyPassword ? "Message" : "Hide"}>Empty password field</div>
                    </div>
                    <div>
                        <label>Confirm password </label>
                        <input type="password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChanged}></input>
                        <div className={this.state.emptyConfirmPassword ? "Message" : "Hide"}>Empty confirm password field</div>
                        <div className={this.state.differentPasswords ? "Message" : "Hide"}>Confirm password not same with password</div>
                    </div>
                    <input className="GrayBtn" type="submit" value="Registration"></input>
                </form>
                <div className="Hide" id="RegCompleted">
                    <h2>Account created!</h2>
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