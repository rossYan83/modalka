import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ModalContainer } from "./Modal.styled";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.body.style.overflow = "";
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isOpen && this.state.isOpen) {
            document.body.style.overflow = "hidden";
        }
        if (prevState.isOpen && !this.state.isOpen) {
            document.body.style.overflow = "";
        }
    }

    handleKeyDown(e) {
        if (e.key === "Escape" && this.state.isOpen) {
            this.close();
        }
    }

    open() {
        this.setState({ isOpen: true });
    }

    close() {
        this.setState({ isOpen: false });
    }

    render() {
        if (!this.state.isOpen || !modalRoot) return null;

        return createPortal(
            <ModalContainer className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) this.close(); }}>
                <div className="modal-content">
                    <button className="modal-close" onClick={this.close} aria-label="Close modal">×</button>
                    {this.props.children}
                </div>
            </ModalContainer>,
            modalRoot
        );
    }
}

export default Modal;