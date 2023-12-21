import { forwardRef, useImperativeHandle, useRef } from "react"

const resultModal = forwardRef(
    function ResultModal({ result, targetTime }, ref) {
    const dialog = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal()
            }
        }
    })

    return (
        <dialog ref={dialog} className="result-modal">
            <h2>You {result}</h2>
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>X seconds left.</strong>
            </p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
})
export default resultModal