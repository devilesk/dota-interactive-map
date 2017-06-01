function ModalControl(id, openBtnId, closeBtnId) {
    this.modal = document.getElementById(id);
    this.openBtn = document.getElementById(openBtnId);
    this.closeBtn = document.getElementById(closeBtnId);
    this.openHandler = this.open.bind(this);
    this.closeHandler = this.close.bind(this);
    this.openBtn.addEventListener('click', this.openHandler, false);
    this.closeBtn.addEventListener('click', this.closeHandler, false);
    window.addEventListener('click', this.closeHandler, false);
}

ModalControl.prototype.open = function () {
    this.modal.classList.add('modal-open');
    this.modal.classList.remove('modal-close');
}


ModalControl.prototype.close = function (event) {
    if (event.target == this.modal || event.target == this.closeBtn) {
        this.modal.classList.add('modal-close');
        this.modal.classList.remove('modal-open');
    }
}

export default ModalControl;