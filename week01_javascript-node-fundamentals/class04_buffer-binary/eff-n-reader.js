const EventEmitter = require('events');

module.exports = class LetterReader extends EventEmitter {
    // configure the reader
    constructor(letters) {
        super();
        this.charCodes = letters.map(letter => letter.charCodeAt(0));
    }

    // used to read a buffer
    read(buffer) {
        // #1 loop thru the bytes
        for(let i = 0; i < buffer.length ; i++) {
            // #2 If the ascii value is b or f, replace with B F
            const ascii = buffer.readInt8(i);
            const isMatch = this.charCodes.some(code => code === ascii);
            if(isMatch) {
                // raise a letter event, when it matches
                this.emit('letter', {
                    value: ascii,
                    offset: i
                });
            }
        }

        // all done, emit end event
        this.emit('end');
    }
}
