import styles from './../styleDefinitions';

class NotificationControl {
    constructor() {
        this.timer = null;
    }

    initialize(id) {
        this.id = id;
        this.info = document.getElementById(id);
        this.infoContent = document.querySelector('#' + id + ' .message-content');
    }
    
    show(message) {
        this.setContent(message);
        this.info.classList.remove('slideUp');
        this.info.classList.add('slideDown');
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.info.classList.add('slideUp');
            this.info.classList.remove('slideDown');
        }, 1500);
    }

    setContent(html) {
        this.infoContent.innerHTML = html;
    }

    open() {
        this.info.classList.add('slideDown');
        this.info.classList.remove('slideUp');
    }

    close() {
        this.info.classList.add('slideUp');
        this.info.classList.remove('slideDown');
    }

}

export default NotificationControl;