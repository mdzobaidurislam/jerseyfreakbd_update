import { BASE_URL } from '@/app/config/api';
import { X } from 'lucide-react';
import React from 'react';

const Modal = ({ isOpen, onClose, images, currentIndex, onPrev, onNext }: any) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay " onClick={onClose}>
            <div className="modal-content overflow-hidden lg:h-full " onClick={(e) => e.stopPropagation()}>
                <button className="modal_close absolute right-2 top-2 " onClick={onClose}><X /></button>
                <button className="modal-prev" onClick={onPrev}>‹</button>
                <img
                    width="100%"
                    height="auto"
                    className='w-full h-auto lg:h-full '
                    src={`${BASE_URL}/public/${images[currentIndex].path}`}
                    alt={`Image ${currentIndex + 1}`} />
                <button className="modal-next" onClick={onNext}>›</button>
            </div>
        </div>
    );
};

export default Modal;
