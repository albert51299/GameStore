import GameList from "./gameList.jsx";
import LoginForm from "./loginForm.jsx";
import RegistrationForm from "./registrationForm.jsx";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoginState: false, isRegState: false };
        this.changeLoginState = this.changeLoginState.bind(this);
        this.changeRegState = this.changeRegState.bind(this);

        this.loginFormComponent = React.createRef();
        this.registrationFormComponent = React.createRef();
    }

    changeLoginState(loginState) {
        this.setState({ isLoginState: loginState });
        this.loginFormComponent.current.resetState();
    }

    changeRegState(regState) {
        this.setState({ isRegState: regState });
        this.loginFormComponent.current.resetState();
        this.registrationFormComponent.current.resetState();
    }

    render() {
        return ( 
            <div>
                <NavigationBar changeLoginState={this.changeLoginState} changeRegState={this.changeRegState} 
                    isLoginState={this.state.isLoginState} isRegState={this.state.isRegState}/>
                <br/>
                <LoginForm ref={this.loginFormComponent} isLoginState={this.state.isLoginState} isRegState={this.state.isRegState} changeLoginState={this.changeLoginState} changeRegState={this.changeRegState}/>
                <RegistrationForm ref={this.registrationFormComponent} isRegState={this.state.isRegState} changeLoginState={this.changeLoginState} changeRegState={this.changeRegState} />
                <GameList isLoginState={this.state.isLoginState}/>
            </div>
        );
    }
}

class NavigationBar extends React.Component {
    constructor(props){
        super(props);
        this.showLoginForm = this.showLoginForm.bind(this);
        this.cancelLogin = this.cancelLogin.bind(this);
        this.cancelReg = this.cancelReg.bind(this);
    }

    homePage() {
        window.location.href = "/index.html"
    }

    showLoginForm() {
        this.props.changeLoginState(true);
    }

    aboutPage() {
        // component instead this
        window.location.href = "/about.html"
    }

    cancelLogin() {
        this.props.changeLoginState(false);
    }

    cancelReg() {
        this.props.changeRegState(false);
    }

    render() {
        return (
            <ul className="NavigationBar">
                <NavigationButton btnName="Home" handler={this.homePage} class={this.props.isLoginState === true ? "Hide" : "NotHide"}/>
                <NavigationButton btnName="Login" handler={this.showLoginForm} class={this.props.isLoginState === true ? "Hide" : "NotHide"}/>
                <NavigationButton btnName="About" handler={this.aboutPage} class={this.props.isLoginState === true ? "Hide" : "NotHide"}/>
                <NavigationButton btnName="Back" handler={this.cancelLogin} class={((this.props.isLoginState === true) && (this.props.isRegState === false)) ? "NotHide" : "Hide"}/>
                <NavigationButton btnName="Cancel" handler={this.cancelReg} class={this.props.isRegState === true ? "NotHide" : "Hide"}/>
            </ul>
        );
    }
}

class NavigationButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);        
    }

    clickHandler() {
        this.props.handler();
    }

    render() {
        return (
            <li className={this.props.class}><input type="button" value={this.props.btnName} onClick={this.clickHandler}></input></li>
        );
    }
}

ReactDOM.render(
    <Content />,
    document.getElementById("content")
);
