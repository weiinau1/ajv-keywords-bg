import type {FuncKeywordDefinition, AnySchemaObject} from "ajv"

//check each field in an array of fields
export default function getDef(): FuncKeywordDefinition {
    return {
        keyword: "showAndRequiredElement",
        type: "object",
        schemaType: "array",
        compile(keys: string[], parentSchema: AnySchemaObject) {
            console.log(keys)
            console.log(parentSchema)
            return (data) => {
                if (!data) return true
                let fieldShowed = data.show_if
                let fieldValidation = data.validation
                if (!fieldShowed || !fieldValidation)
                    return true

                function checkRequiredIfFailed() {
                    if((fieldValidation.includes("required_if") || fieldValidation.includes("accepted_if"))){
                        return fieldShowed && !fieldValidation.includes(fieldShowed);
                    }else if(fieldValidation.includes("required_without") || fieldValidation.includes("accepted_without"))
                    {
                       return false
                    } else if(fieldValidation.includes("required") || fieldValidation.includes("accepted")){
                        return fieldShowed
                    }
                }

                if (checkRequiredIfFailed()) {
                    return false
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
