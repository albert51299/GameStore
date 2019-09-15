class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: "", password: "", 
            emptyLogin: false, emptyPassword: false, wrongLoginOrPassword: false };

        this.onLoginChanged = this.onLoginChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);

        this.regHandler = this.regHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    regHandler() {
        this.props.changeRegState(true);
    }

    onLoginChanged(e) {
        this.setState({ login: e.target.value });
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({ emptyLogin: false, emptyPassword: false, wrongLoginOrPassword: false });

        if ((this.state.login === "") || (this.state.password === "")) {
            if (this.state.login === "") {
                this.setState({ emptyLogin: true });
            }
    
            if (this.state.password === "") {
                this.setState({ emptyPassword: true });
            }
        } 
        else {
            let data = JSON.stringify({ "login":this.state.login, "password":this.state.password });

            fetch("/api/Login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: data
            })
                .then(response => response.json())
                .then(data => {
                    if (data.signedIn === "true") {
                        this.props.changeLoginData(data.signedIn, data.login, data.accType);
                        this.props.changeLoginState(false);
                    }
                    else {
                        this.setState({ wrongLoginOrPassword: true });
                    }
                });
        }
    }

    componentDidMount() {
        this.loginInput.focus();
    }

    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <div>
                    <label>Login </label>
                    <input ref={(input) => { this.loginInput = input; }}  type="text" value={this.state.login} onChange={this.onLoginChanged}></input>
                    <div className={this.state.emptyLogin ? "Message" : "Hide"}>Empty login field</div>
                </div>
                <div>
                    <label>Password </label>
                    <input type="password" value={this.state.password} onChange={this.onPasswordChanged}></input>
                    <div className={this.state.emptyPassword ? "Message" : "Hide"}>Empty password field</div>
                </div>
                <div className={this.state.wrongLoginOrPassword ? "Message" : "Hide"}>Wrong login or password</div>
                <input className="GrayBtn" type="submit" value="Login"></input>
                <input className="GrayBtn" type="button" value="Registration" onClick={this.regHandler}></input>
                </form>
            </div>
        );
    }
}

export default LoginForm;
