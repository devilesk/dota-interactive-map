import styles from './../styleDefinitions';

function NotificationControl() {
    this.timer = null;
}

NotificationControl.prototype.show = function (message) {
    this.setContent(message);
    this.info.classList.remove('slideUp');
    this.info.classList.add('slideDown');
    clearTimeout(this.timer);
    const self = this;
    this.timer = setTimeout(function () {
        self.info.classList.add('slideUp');
        self.info.classList.remove('slideDown');
    }, 1500);
}

NotificationControl.prototype.setContent = function (html) {
    this.infoContent.innerHTML = html;
}

NotificationControl.prototype.open = function () {
    this.info.classList.add('slideDown');
    this.info.classList.remove('slideUp');
}

NotificationControl.prototype.close = function () {
    this.info.classList.add('slideUp');
    this.info.classList.remove('slideDown');
}

NotificationControl.prototype.initialize = function (id) {
    const self = this;
    this.id = id;
    this.info = document.getElementById(id);
    this.infoContent = document.querySelector('#' + id + ' .message-content');
}

export default NotificationControl;