import { validateSync } from "class-validator";
import ValidatorFieldsInterface, { FildsErrors } from "./validator-fields.interface";

export default abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated>{
    errors: FildsErrors = null;
    validatedData: PropsValidated = null;

    validate(data: any): boolean{
        const errors = validateSync(data);
        if (errors.length > 0) {
            this.errors = {};
            for (const error of errors) {
                const field = error.property;
                this.errors[field] = Object.values(error.constraints);
            }
        } else {
            this.validatedData = data;
        }

        return !errors.length;
    }
}