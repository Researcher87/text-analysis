import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { applicationStrings } from "../static/applicationStrings";
import { LanguageContext } from "../context/LanguageContext";

type Props = {
  show: boolean;
  title: string;
  onConfirm: (inputValue: string) => void;
  onCancel: () => void;
};

const InputModal: React.FC<Props> = ({ show, title, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState("");
  const { language } = useContext(LanguageContext)

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {applicationStrings._cancel[language]}
        </Button>
        <Button variant="primary" onClick={() => onConfirm(inputValue)}>
          {applicationStrings._apply[language]}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InputModal;