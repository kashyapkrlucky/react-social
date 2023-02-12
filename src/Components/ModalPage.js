import React from 'react';
import ReactDOM from "react-dom";
import '../Styles/index.css';
const modalRoot = document.getElementById('modal-root');

class ModalPage extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('section');
        this.el.classList.add('overlay-bd');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
            // document.getElementById('modal-root')
        );
    }
}

export { ModalPage };