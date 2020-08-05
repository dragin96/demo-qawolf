class BasePO {
    classStartsWith(className) {
        return `[class^="${className}"]`;
    }

    classInclude(className) {
        return `[class*="${className}"]`;
    }
}
module.exports = BasePO;
