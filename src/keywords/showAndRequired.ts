import type {Plugin} from "ajv"
import getDef from "../definitions/showAndRequired"

const showAndRequired: Plugin<undefined> = (ajv) => ajv.addKeyword(getDef())

export default showAndRequired
module.exports = showAndRequired