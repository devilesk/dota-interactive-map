import BaseControl from './base';
import styles from '../definitions/styles';
import modeNotificationText from '../definitions/modeNotificationText';

class NotificationControl extends BaseControl {
    constructor(InteractiveMap, root) {
        super(InteractiveMap);
        this.timer = null;
        this.info = root;
        this.infoContent = this.info.querySelector('.message-content');
        
        this.InteractiveMap.on('isNight', value => this.show(value ? modeNotificationText.nightOn : modeNotificationText.nightOff));
        this.InteractiveMap.on('isDarkness', value => this.show(value ? modeNotificationText.darknessOn : modeNotificationText.darknessOff));
        this.InteractiveMap.on('treesEnabled', value => this.show(value ? modeNotificationText.treeEnable : modeNotificationText.treeDisable));
        this.InteractiveMap.on('dataId', value => this.show(value ? modeNotificationText.saveSuccess : modeNotificationText.saveFailed));
        this.InteractiveMap.on('share', value => this.show(modeNotificationText.share));
        this.InteractiveMap.on('mode', value => this.show(modeNotificationText[value]));
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
