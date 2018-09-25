
module.exports = class CoolStringifier {
    constructor(sentence) {
        this.sentence = sentence;
    }

    getWords() {
        return this.sentence.split(' ');
    }

    reverseWords() {
        this.sentence = this.getWords().reverse().join(' ');
    }

    reverseLetters() {
        this.sentence = this.getWords().map(word => {
            return word.split('').reverse().join('');
        }).join(' ');
    }
};
