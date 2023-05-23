import type {FuncKeywordDefinition, AnySchemaObject} from "ajv"

//check a whole array
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
                    let fieldValidation = field["validation"];
                    if (!fieldShowed||!fieldValidation)
                        continue

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
