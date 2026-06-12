import React, { Component, createRef } from "react";
import { Container } from "./components/Modal/Container/Container";
import { GlobalStyle } from "./GlobalStyle";
import Modal from "./components/Modal/Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    if (this.modalRef.current && this.modalRef.current.open) {
      this.modalRef.current.open();
    }
  }

  render() {
    return (
      <Container>
        <GlobalStyle />
        <button type="button" onClick={this.openModal}>Open Modal</button>
        <Modal ref={this.modalRef}>
          <h2>Привіт!</h2>
          <p>Це модальне вікно. Натисніть Escape або кнопку, щоб закрити.</p>
        </Modal>
      </Container>
    );
  }
}

export default App;