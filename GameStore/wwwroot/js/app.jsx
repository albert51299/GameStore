class Hello extends React.Component {
    render() {
        return <h1>Welcome to GameStore!</h1>;
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById("content")
);
