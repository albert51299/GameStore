class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: "", password: "", wrongData: false };

        this.onLoginChanged = this.onLoginChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);

        this.regHandler = this.regHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    resetState() {
        this.setState({ login: "", password: "", wrongData: false });
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
        
        // check fields for correct

        // fetch
    }

    render () {
        return (
            <div className={((this.props.isLoginState === true) && (this.props.isRegState === false)) ? "NotHide" : "Hide"}>
                <form onSubmit={this.onSubmit}>
                <div>
                    <label>Login</label>
                    <input type="text" value={this.state.login} onChange={this.onLoginChanged}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.onPasswordChanged}></input>
                </div>
                <input className="GrayBtn" type="submit" value="Login"></input>
                <input className="GrayBtn" type="button" value="Registration" onClick={this.regHandler}></input>
                </form>
            </div>
        );
    }
}

export default LoginForm;
