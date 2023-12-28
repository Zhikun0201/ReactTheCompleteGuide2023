import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom"
import Button from "./Button.jsx";

const Modal = forwardRef(
  function Modal(
    {children, buttonLabel, ...props},
    ref
  ) {
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
          dialog.current.showModal();
        }
      }
    ));

    return createPortal(
      <dialog
        ref={dialog}
        className={"backdrop:bg-stone-900/90 p-4 rounded-md shadow-wd"}>
        {children}
        <form method="dialog" className="mt-6 text-right">
          <Button>
            {buttonLabel}
          </Button>
        </form>
      </dialog>
      , document.getElementById("modal-root"))

  }
)
export default Modal;