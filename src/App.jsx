import React, { useState } from "react";
import Modal from "./components/modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleToggle}>Otwórz modal</button>
      <Modal isOpen={isOpen} onToggle={handleToggle}>
        <Modal.Header title="Modal" />
        <Modal.Content>Mamy to</Modal.Content>
        <Modal.Footer callToActionLabel="OK" />
      </Modal>
    </div>
  );
}

export default App;
