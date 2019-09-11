import BuyPanel from "./buyPanel.jsx";
import Purchases from "./purchases.jsx";
import LoginForm from "./loginForm.jsx";
import RegistrationForm from "./registrationForm.jsx";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoginState: false, isRegState: false, 
            signedIn: "false", login: "", accType:"", 
            showPurchases: false, confirmBuy: false 
        };

        this.changeLoginState = this.changeLoginState.bind(this);
        this.changeRegState = this.changeRegState.bind(this);
        this.changeLoginData = this.changeLoginData.bind(this);
        this.changeShowPurchases = this.changeShowPurchases.bind(this);
        this.changeConfirmBuy = this.changeConfirmBuy.bind(this);

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

    changeLoginData(SignedIn, Login, AccType) {
        this.setState({ signedIn: SignedIn, login: Login, accType: AccType });
    }

    changeShowPurchases(show) {
        this.setState({ showPurchases: show });
    }

    changeConfirmBuy(confirm) {
        this.setState({ confirmBuy: confirm });
    }

    render() {
        return ( 
            <div>
                <NavigationBar signedIn={this.state.signedIn} accType={this.state.accType} showPurchases={this.state.showPurchases}
                    changeLoginData={this.changeLoginData} changeShowPurchases={this.changeShowPurchases}
                    changeLoginState={this.changeLoginState} changeRegState={this.changeRegState} 
                    isLoginState={this.state.isLoginState} isRegState={this.state.isRegState}
                    confirmBuy={this.state.confirmBuy}/>
                <br/>
                <LoginForm ref={this.loginFormComponent} changeLoginData={this.changeLoginData}
                    isLoginState={this.state.isLoginState} isRegState={this.state.isRegState} 
                    changeLoginState={this.changeLoginState} changeRegState={this.changeRegState} />
                <RegistrationForm ref={this.registrationFormComponent} isRegState={this.state.isRegState} 
                    changeLoginState={this.changeLoginState} changeRegState={this.changeRegState}/>
                {
                    ((this.state.isLoginState === true) || (this.state.showPurchases === true) 
                        || (this.state.confirmBuy === true)) ? null : 
                            <BuyPanel signedIn={this.state.signedIn} confirmBuy={this.state.confirmBuy} 
                                changeConfirmBuy={this.changeConfirmBuy}/>
                }
                {
                    this.state.showPurchases ? <Purchases /> : null
                }
            </div>
        );
    }
}

class NavigationBar extends React.Component {
    constructor(props){
        super(props);
        this.purchases = this.purchases.bind(this);
        this.cancelPurchases = this.cancelPurchases.bind(this);
        this.showLoginForm = this.showLoginForm.bind(this);
        this.logout = this.logout.bind(this);
        this.cancelLogin = this.cancelLogin.bind(this);
        this.cancelReg = this.cancelReg.bind(this);
    }

    homePage() {
        window.location.href = "/index.html"
    }

    purchases() {
        this.props.changeShowPurchases(true);
    }

    cancelPurchases() {
        this.props.changeShowPurchases(false);
    }

    showLoginForm() {
        this.props.changeLoginState(true);
    }

    logout() {
        var flag = confirm("Are you sure want to logout?");
        if (flag === true) {
            fetch("/api/Login", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data === "ok") {
                        this.props.changeLoginData("false", "", "");
                        this.props.changeLoginState(true);
                        this.props.changeLoginState(false);
                    }
                });
        }
    }

    cancelLogin() {
        this.props.changeLoginState(false);
    }

    cancelReg() {
        this.props.changeRegState(false);
    }

    render() {
        return (
            <ul className={this.props.confirmBuy === false ? "NavigationBar" : "Hide"}>
                <NavigationButton btnName="Home" handler={this.homePage} 
                    class={((this.props.isLoginState === true) || (this.props.showPurchases === true)) ? "Hide" : "NotHide"}/>
                <NavigationButton btnName="Purchases" handler={this.purchases} 
                    class={((this.props.accType === "Client") && (this.props.showPurchases === false)) ? "NotHide" : "Hide"}/>
                <NavigationButton btnName="Back" handler={this.cancelPurchases} class={this.props.showPurchases === true ? "NotHide" : "Hide"}/>
                <NavigationButton btnName="Login" handler={this.showLoginForm} 
                    class={((this.props.isLoginState === true) || (this.props.signedIn === "true")) ? "Hide" : "NotHide"}/>
                <NavigationButton btnName="Logout" handler={this.logout} 
                    class={((this.props.signedIn === "false") || (this.props.showPurchases === true)) ? "Hide" : "NotHide"}/>
                <NavigationButton btnName="Back" handler={this.cancelLogin} 
                    class={((this.props.isLoginState === true) && (this.props.isRegState === false)) ? "NotHide" : "Hide"}/>
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
