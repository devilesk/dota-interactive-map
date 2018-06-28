class ModalControl {
    constructor(id, openBtnId, closeBtnId) {
        this.modal = document.getElementById(id);
        
        this.openBtn = document.getElementById(openBtnId);
        this.openBtn.addEventListener('click', () => {
            this.modal.classList.add('modal-open');
            this.modal.classList.remove('modal-close');
        }, false);
        
        this.closeBtn = document.getElementById(closeBtnId);
        const closeHandler = evt => {
            if (evt.target == this.modal || evt.target == this.closeBtn) {
                this.modal.classList.add('modal-close');
                this.modal.classList.remove('modal-open');
            }
        };
        
        this.closeBtn.addEventListener('click', closeHandler, false);
        window.addEventListener('click', closeHandler, false);
    }
}

export default ModalControl;