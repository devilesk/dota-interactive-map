import styles from '../definitions/styles';

class NotificationControl {
    constructor(root) {
        this.timer = null;
        this.info = root;
        this.infoContent = this.info.querySelector('.message-content');
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
