export default class Helper {
    constructor () {}

    static closestMultipleOf(multiple, number) {
        return Math.round(number / multiple) * multiple;
    }
}