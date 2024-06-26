/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    plugins: ['prettier-plugin-solidity'],
    semi: false,
    tabWidth: 4,
    singleQuote: true,
    printWidth: 920,
    overrides: [
        {
            files: '*.sol',
            options: {
                parser: 'solidity-parse',
                printWidth: 80,
                tabWidth: 8,
                useTabs: false,
                singleQuote: false,
                bracketSpacing: false,
            },
        },
    ],
}

export default config
