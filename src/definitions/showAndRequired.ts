import type {FuncKeywordDefinition, AnySchemaObject} from "ajv"


export default function getDef(): FuncKeywordDefinition {
    return {
        keyword: "showAndRequired",
        type: "array",
        schemaType: "array",
        compile(keys: string[], parentSchema: AnySchemaObject) {
            console.log(keys);
            console.log(parentSchema);
            return (data) => {
                if (data.length <= 1) return true
                for (const field of data) {
                    let fieldShowed = field["show_if"]
                    if (!fieldShowed ) continue
                    let fieldValidation = field["validation"]
                    if (fieldValidation.includes("required_if") && !fieldValidation.includes(fieldShowed)) {
                        return false;
                    }
                }
                return true
            }
        },
        metaSchema: {
            type: "array",
            items: {type: "string"},
        },
    }
}



module.exports = getDef
