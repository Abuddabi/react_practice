import React, { Component, useState } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

const App = () => {
  const [modalStatus, setModalStatus] = useState('CLOSED');

  const showModal = () => {
    setModalStatus('OPENED');
  }

  const closeModal = () => {
    setModalStatus('CLOSING');

    setTimeout(() => {
      setModalStatus('CLOSED');
    }, 500);
  };

  const modal = modalStatus === 'CLOSED' ? null : (
    <>
      <Modal modalStatus={modalStatus} closed={closeModal} />
      <Backdrop onClick={closeModal} modalStatus={modalStatus} />
    </>);

  return (
    <div className="App" >
      <h1>React Animations</h1>
      {modal}
      <button className="Button" onClick={showModal} > Open Modal</button>
      <h3>Animating Lists</h3>
      <List />
    </div >
  );
}

export default App;
