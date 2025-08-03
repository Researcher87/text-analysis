import React, {CSSProperties, ReactElement, useContext} from "react";
import {Modal} from "react-bootstrap";
import { LanguageContext } from "../context/LanguageContext";
import { HelpText } from "../types/misc";
import { getText } from "../service/Text";

interface HelpModalProps {
    helpText: HelpText,
    size?: "sm" | "lg" | "xl" | undefined,
    style?: CSSProperties | undefined,
    closeHelpModal: () => void
}

export function HelpModal(props: HelpModalProps): ReactElement {
    const language = useContext(LanguageContext).language

    if (!props.helpText) {
        return (<div>No data available.</div>);
    }

    return (
        <Modal className={"help-modal"}
               size={props.size ? props.size : "sm"}
               show={true}
               onHide={props.closeHelpModal}
               backdrop="static"
               style={props.style ? props.style : {}}
        >
            <Modal.Header>
                <h5 className="modal-title">{props.helpText.title}</h5>
                <button type="button"
                        className="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={props.closeHelpModal}>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div dangerouslySetInnerHTML={{__html: props.helpText.content}}
                      style={{overflowY: "auto", maxHeight: "66vh"}}
                />
            </Modal.Body>
            <Modal.Footer>
                <button type="button"
                        className="btn btn-primary"
                        onClick={props.closeHelpModal}>
                    {getText("_close", language)}
                </button>
            </Modal.Footer>
        </Modal>
    )
}