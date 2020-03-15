const { resolve } = require('path');
module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '~service/(.*)$': resolve(__dirname, 'src/$1'),
    },
    testMatch: [
        '**/*.spec.(ts|js)'
    ],
    testEnvironment: 'node'
};