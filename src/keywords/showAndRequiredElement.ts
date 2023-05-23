import type {Plugin} from "ajv"
import getDef from "../definitions/showAndRequiredElement"

const showAndRequiredElement: Plugin<undefined> = (ajv) => ajv.addKeyword(getDef())

export default showAndRequiredElement
module.exports = showAndRequiredElement