import AdminPanel from "./adminPanel.jsx";
import BuyPanel from "./buyPanel.jsx";
import Purchases from "./purchases.jsx";
import LoginForm from "./loginForm.jsx";
import RegistrationForm from "./registrationForm.jsx";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoginState: false, isRegState: false, 
            signedIn: "false", login: "", accType:"", clientBalance: -1,
            showPurchases: false, confirmBuy: false,
            updateDataState: false, addGameState: false, editGameState: false
        };

        this.changeLoginState = this.changeLoginState.bind(this);
        this.changeRegState = this.changeRegState.bind(this);
        this.changeLoginData = this.changeLoginData.bind(this);
        this.changeClientBalance = this.changeClientBalance.bind(this);
        this.changeShowPurchases = this.changeShowPurchases.bind(this);
        this.changeUpdateDataState = this.changeUpdateDataState.bind(this);
        this.changeAddGameState = this.changeAddGameState.bind(this);
        this.changeEditGameState = this.changeEditGameState.bind(this);
        this.changeConfirmBuy = this.changeConfirmBuy.bind(this);

        this.loginFormComponent = React.createRef();
        this.registrationFormComponent = React.createRef();
    }

    changeLoginState(loginState) {
        this.setState({ isLoginState: loginState });
        this.loginFormComponent.current.resetState();
    }

    changeRegState(state) {
        this.setState({ isRegState: state });
        this.loginFormComponent.current.resetState();
        this.registrationFormComponent.current.resetState();
    }

    changeLoginData(SignedIn, Login, AccType) {
        this.setState({ signedIn: SignedIn, login: Login, accType: AccType });
    }

    changeClientBalance(value) {
        this.setState({ clientBalance: value });
    }

    changeShowPurchases(state) {
        this.setState({ showPurchases: state });
    }

    changeUpdateDataState(state) {
        this.setState({ updateDataState: state });
    }

    changeAddGameState(state) {
        this.setState({ addGameState: state });
    }

    changeEditGameState(state) {
        this.setState({ editGameState: state });
    }

    changeConfirmBuy(state) {
        this.setState({ confirmBuy: state });
    }

    render() {
        return ( 
            <div>
                <NavigationBar signedIn={this.state.signedIn} accType={this.state.accType} showPurchases={this.state.showPurchases}
                    clientBalance={this.state.clientBalance} changeClientBalance={this.changeClientBalance}
                    changeLoginData={this.changeLoginData} changeShowPurchases={this.changeShowPurchases}
                    changeLoginState={this.changeLoginState} changeRegState={this.changeRegState} 
                    isLoginState={this.state.isLoginState} isRegState={this.state.isRegState}
                    confirmBuy={this.state.confirmBuy} updateDataState={this.state.updateDataState}
                    changeUpdateDataState={this.changeUpdateDataState} addGameState={this.state.addGameState}
                    changeAddGameState={this.changeAddGameState} editGameState={this.state.editGameState}/>
                <br/>
                <LoginForm ref={this.loginFormComponent} changeLoginData={this.changeLoginData}
                    isLoginState={this.state.isLoginState} isRegState={this.state.isRegState} 
                    changeLoginState={this.changeLoginState} changeRegState={this.changeRegState} />
                <RegistrationForm ref={this.registrationFormComponent} isRegState={this.state.isRegState} 
                    changeLoginState={this.changeLoginState} changeRegState={this.changeRegState}/>
                {
                    this.state.updateDataState ? <AdminPanel addGameState={this.state.addGameState} editGameState={this.state.editGameState}
                        changeAddGameState={this.changeAddGameState} changeEditGameState={this.changeEditGameState}/> : null
                }
                {
                    ((this.state.isLoginState === true) || (this.state.showPurchases === true) 
                        || (this.state.updateDataState)) ? null : 
                            <BuyPanel accType={this.state.accType} confirmBuy={this.state.confirmBuy} 
                                changeConfirmBuy={this.changeConfirmBuy}
                                clientBalance={this.state.clientBalance} changeClientBalance={this.changeClientBalance}/>
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
        this.updateData = this.updateData.bind(this);
        this.cancelUpdateData = this.cancelUpdateData.bind(this);
        this.addGame = this.addGame.bind(this);
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

    updateData() {
        this.props.changeUpdateDataState(true);
    }

    addGame() {
        this.props.changeAddGameState(true);
    }

    cancelUpdateData() {
        this.props.changeUpdateDataState(false);
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
            <ul className="NavigationBar">
                <NavigationButton btnName="Home" handler={this.homePage} 
                    class={((this.props.isLoginState === true) || (this.props.showPurchases === true) || (this.props.updateDataState) 
                    || (this.props.signedIn === "true")) ? "Hide" : "NavLi"}/>
                <NavigationButton btnName="Update data" handler={this.updateData}
                    class={((!this.props.updateDataState) && (this.props.accType === "Admin")) ? "NavLi" : "Hide"}/>
                <NavigationButton btnName="Back" handler={this.cancelUpdateData}
                    class={this.props.updateDataState && !this.props.editGameState ? "NavLi" : "Hide"}/>
                <NavigationButton btnName="Add game" handler={this.addGame}
                    class={this.props.updateDataState && !this.props.addGameState && !this.props.editGameState ? "NavLi" : "Hide"}/>
                <NavigationButton btnName="Purchases" handler={this.purchases} 
                    class={((this.props.accType === "Client") && (this.props.showPurchases === false) 
                    && (!this.props.confirmBuy)) ? "NavLi" : "Hide"}/>
                <NavigationButton btnName="Back" handler={this.cancelPurchases} class={this.props.showPurchases === true ? "NavLi" : "Hide"}/>
                <NavigationButton btnName="Login" handler={this.showLoginForm} 
                    class={((this.props.isLoginState === true) || (this.props.signedIn === "true")) ? "Hide" : "NavLi"}/>
                <NavigationButton btnName="Logout" handler={this.logout} 
                    class={((this.props.signedIn === "false") || (this.props.showPurchases === true) || (this.props.updateDataState) 
                    || (this.props.confirmBuy)) ? "Hide" : "NavLi"}/>
                <NavigationButton btnName="Back" handler={this.cancelLogin} 
                    class={((this.props.isLoginState === true) && (this.props.isRegState === false)) ? "NavLi" : "Hide"}/>
                <NavigationButton btnName="Cancel" handler={this.cancelReg} class={this.props.isRegState === true ? "NavLi" : "Hide"}/>
                {
                    (this.props.accType === "Client") ? <ClientBalance clientBalance={this.props.clientBalance}
                        changeClientBalance={this.props.changeClientBalance}/> : null
                }
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

class ClientBalance extends React.Component {
    constructor(props) {
        super(props);
        this.addHandler = this.addHandler.bind(this);
    }

    loadBalance() {
        var url = "/api/Buy/GetBalance";
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.props.changeClientBalance(Number(data));
            });
    }

    componentDidMount() {
        this.loadBalance();
    }

    addHandler() {
        let result = +prompt("Enter sum");
        if (isNaN(result) || result < 1) {
            alert("Incorrect sum");
        }
        else {
            var url = "/api/Buy/ReplenishBalance?enteredSum=" + result;
            fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => {
                if (data === "ok") {
                    let currentBalance = this.props.clientBalance + result;
                    this.props.changeClientBalance(currentBalance);
                }
            });
        }
    }

    render() {
        return(
            <div className="RightAlign">
                <li className="NavLi">
                    <p id="Balance" className="RuPrice">{this.props.clientBalance}</p>
                    <input id="AddBalanceBtn" className="GrayBtn" type="button" value="Add" onClick={this.addHandler}></input>
                </li>
            </div>
        );
    }
}

ReactDOM.render(
    <Content />,
    document.getElementById("content")
);
