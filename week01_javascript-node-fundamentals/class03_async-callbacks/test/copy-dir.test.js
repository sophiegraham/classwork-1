const assert = require('assert');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const copyDir = require('../lib/copy-dir');

describe('copy dir', () => {

    const sourcePath = path.join(__dirname, 'copy-dir-source');
    const destPath = path.join(__dirname, 'copy-dir-dest');

    beforeEach(done => {
        rimraf(destPath, err => {
            if(err && err.code !== 'ENOENT') done(err);
            else done();
        });
    });

    it('copies directory from source to destination', done => {
        copyDir(sourcePath, destPath, err => {
            if(err) return done(err);

            const sourceFiles = fs.readdirSync(sourcePath);
            const destFiles = fs.readdirSync(destPath);

            assert.deepEqual(destFiles, sourceFiles);
            done();
        });
    });

});
