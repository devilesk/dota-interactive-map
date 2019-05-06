import BaseControl from './base';

class BaseInfoControl extends BaseControl {
    constructor(InteractiveMap, element, css) {
        super(InteractiveMap);
        this._content = '';
        this._opened = false;
        this._active = false;
        this.element = element;
        this.css = {
            close: 'slideDown',
            open: 'slideUp',
            active: 'active',
            ...css,
        };

        this.on('opened', this.onOpened.bind(this));
        this.on('closed', this.onClosed.bind(this));
        this.on('content', this.onContent.bind(this));
        this.on('active', this.onActive.bind(this));
        this.on('inactive', this.onInactive.bind(this));

        const btnClose = this.element.querySelector('.btn-close');
        if (btnClose) {
            btnClose.addEventListener('click', (evt) => {
                this.opened = false;
                this.active = false;
            }, false);
        }
    }

    get contentElement() {
        return this.element.querySelector('.message-content');
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
        this.emit('content', value);
    }

    get opened() {
        return this._opened;
    }

    set opened(value) {
        this._opened = value;
        this.emit(value ? 'opened' : 'closed');
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
        this.emit(value ? 'active' : 'inactive');
    }

    clear(overrideActive = false) {
        if (!this.active || overrideActive) {
            this.content = '';
            this.opened = false;
            this.active = false;
        }
    }

    display(content, active = false) {
        this.content = content;
        this.opened = true;
        if (active) {
            this.active = true;
        }
    }

    onOpened() {
        this.element.classList.add(this.css.open);
        this.element.classList.remove(this.css.close);
    }

    onClosed() {
        this.element.classList.add(this.css.close);
        this.element.classList.remove(this.css.open);
    }

    onContent(html) {
        this.contentElement.innerHTML = html;
    }

    onActive() {
        this.element.classList.add(this.css.active);
    }

    onInactive() {
        this.element.classList.remove(this.css.active);
    }
}

export default BaseInfoControl;
