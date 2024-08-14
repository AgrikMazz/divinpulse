import useImageModal from "@/hooks/useImageModal";
import Modal from "./Modal";

const ImageModal = () => {
    const { onClose, isOpen } = useImageModal();

    const onChange = (open: boolean) => {
        if (!open) { 
            onClose();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
        >
            <div>
                <img alt="image" />
            </div>
        </Modal>
    );
}
 
export default ImageModal;