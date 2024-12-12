import React, { createContext } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

class Modal extends React.Component {
  static Header = ({ title }) => (
    <ModalContext.Consumer>
      {({ }) => (
        <div style={styles.header}>
          <h3>{title}</h3>
        </div>
      )}
    </ModalContext.Consumer>
  );

  static Content = ({ children }) => (
    <ModalContext.Consumer>
      {({ isOpen }) => (isOpen ? <div style={styles.content}>{children}</div> : null)}
    </ModalContext.Consumer>
  );

  static Footer = ({ callToActionLabel }) => (
    <ModalContext.Consumer>
      {({ toggle }) => (
        <div style={styles.footer}>
          <button onClick={toggle} style={styles.button}>
            Cancel
          </button>
          <button
            onClick={() => {
              alert("OK");
              toggle();
            }}
            style={styles.button}
          >
            {callToActionLabel}
          </button>
        </div>
      )}
    </ModalContext.Consumer>
  );

  toggle = () => {
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle();
    }
  };

  render() {
    const { isOpen, children } = this.props;

    return (
      <ModalContext.Provider value={{ isOpen, toggle: this.toggle }}>
        {isOpen && (
          <div style={styles.overlay} onClick={this.toggle}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        )}
      </ModalContext.Provider>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    width: "400px",
    maxWidth: "90%",
  },
  header: {
    backgroundColor: "white",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  closeButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "3px",
  },
  content: {
    padding: "10px",
    backgroundColor: "white",
  },
  footer: {
    backgroundColor: "white",
    padding: "10px",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  button: {
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "3px",
  },
};

export default Modal;