/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    plugins: ['prettier-plugin-solidity'],
    semi: false,
    tabWidth: 4,
    singleQuote: true,
    printWidth: 120,
}

export default config
