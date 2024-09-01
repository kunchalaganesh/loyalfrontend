import React from 'react';
import Modal from 'react-modal';
import './ErrorModal.css'; // Import a CSS file for styles

const ErrorModal = ({ isOpen, onRequestClose, onReload, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Error Modal"
      ariaHideApp={false}
      className="errorModal" // Add a class name for styling
      overlayClassName="errorModalOverlay" // Add a class for overlay
    >
      <h2>Error</h2>
      <p>{message}</p>
      <div className="errorModalButtons">
        <button className="modalButton" onClick={onRequestClose}>Close</button>
        <button className="modalButton" onClick={onReload}>Reload</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
