function EventEmitter() {
    this._events = Object.create(null);
}

EventEmitter.prototype.on = function (eventName, callback) {
    let arr = this._events[eventName] || (this._events[eventName] = []);
    arr.push(callback);
}

EventEmitter.prototype.emit = function (eventName, ...args) {
    this._events[eventName].forEach((cb) => {
        cb(...args);
    })
}

EventEmitter.prototype.off = function (eventName, callback) {
    this._events[eventName].filter((cb) => {
        return cb !== callback;
    })
}

EventEmitter.prototype.once = function (eventName, callback) {
    const onlyOne =  () => {
        callback();
        this.off(eventName, callback);
    }

    this.on(eventName, onlyOne);
}
