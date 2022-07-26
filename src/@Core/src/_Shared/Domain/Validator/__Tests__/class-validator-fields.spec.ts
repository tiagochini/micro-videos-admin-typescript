import ClassValidatorFields from "../class-validator-fields";
import * as libClasValidator from "class-validator";

class StubClassValidator extends ClassValidatorFields<{filed:string}>{

}

describe("ClassValidatorFields Unit Test", () => { 

    it("should initialize erros and validateData variable with null", () => { 
        const validator = new StubClassValidator();
        expect(validator.errors).toBeNull();
        expect(validator.validatedData).toBeNull();
    });

    it("should validate with errors", () => { 
        const spyValidateSync = jest.spyOn(libClasValidator, "validateSync");
        spyValidateSync.mockReturnValue([{ property: "field", constraints: { isRequired: "The field is required" } }]);
        
        const validator = new StubClassValidator();
        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({ field: ["The field is required"] });
    });

    it("should validate without errors", () => {
        const spyValidateSync = jest.spyOn(libClasValidator, "validateSync");
        spyValidateSync.mockReturnValue([]);

        const validator = new StubClassValidator();
        expect(validator.validate({field: "value"})).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toStrictEqual({ field: "value" });
        expect(validator.errors).toBeNull();
    });
});