class ModalControl {
    constructor(root, id, openBtnId, closeBtnId) {
        this.root = root;
        this.modal = this.root.getElementById(id);

        this.openBtn = this.root.getElementById(openBtnId);
        this.openBtn.addEventListener('click', () => {
            this.modal.classList.add('modal-open');
            this.modal.classList.remove('modal-close');
        }, false);

        this.closeBtn = this.root.getElementById(closeBtnId);
        const closeHandler = (evt) => {
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
