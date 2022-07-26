import { ValidationError } from "#Shared/Domain/Errors/validation-error";
import ValidatorRules from "../validator-rules";

type ValuesValidationRule = {
    value: any;
    property: string;
}

type ExpectedRuleTest = {
    value: any;
    property: string;
    rule: keyof ValidatorRules;
    error: ValidationError;
    params?: any[];
}

function assertIsInvalid(expected: ExpectedRuleTest) {
    expect(() => {
        runRule(expected)
    }).toThrowError(expected.error);
}

function assertIsValid(expected: ExpectedRuleTest) {
    expect(() => {
        runRule(expected)
    }).not.toThrowError(expected.error);
}

function runRule({
    value,
    property,
    rule,
    params = [],
}: Omit<ExpectedRuleTest, "error">) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule] as (...args: any[]) => ValidatorRules;
    method.apply(validator, params);
}

describe("ValidatorRules Unit Test", () => {

    test('values method', () => {
        const validator = ValidatorRules.values("same value", "field");
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator["value"]).toBe("same value");
        expect(validator["property"]).toBe("field");
    });

    test('required method', () => {
        let arrange: ValuesValidationRule[] = [
            { value: null, property: "field" },
            { value: "", property: "field" },
            { value: undefined, property: "field" },
        ];

        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "required", error: new ValidationError("The field is required") });
        });

        //case is valid
        arrange = [
            { value: "string", property: "field" },
            { value: 0, property: "field" },
            { value: 5, property: "field" },
            { value: false, property: "field" },
            { value: true, property: "field" },
        ];

        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: "required", error: new ValidationError("The field is required") });
        });
    });

    test('string method', () => {
        let arrange: ValuesValidationRule[] = [
            { value: 0, property: "field" },
            { value: 5, property: "field" },
            { value: false, property: "field" },
            { value: true, property: "field" },
        ];

        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "string", error: new ValidationError("The field must be a string") });
        });

        //case is valid
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "string", property: "field" },
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: "string", error: new ValidationError("The field must be a string") });
        });
    });

    test('maxLength method', () => {
        let arrange: ValuesValidationRule[] = [
            { value: "asd asdasd", property: "field" },
        ];
        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "maxLength", error: new ValidationError("The field must be less than 3 characters"), params: [3] });
        });

        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "asd", property: "field" },
            { value: "asdasd", property: "field" },
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: "maxLength", error: new ValidationError("The field must be less than 255 characters"), params: [255] });
        });
    });


    test('minLength method', () => {
        let arrange: ValuesValidationRule[] = [
            { value: "asasdf asdf", property: "field" },
        ];
        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "minLength", error: new ValidationError("The field must be greater than 255 characters"), params: [255] });
        });
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "asd asdasd", property: "field" },
            { value: "asd", property: "field" },
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: "minLength", error: new ValidationError("The field must be greater than 3 characters"), params: [3] });
        });
    });

    test('boolean method', () => {
        let arrange: ValuesValidationRule[] = [
            { value: "asasdf asdf", property: "field" },
            { value: "", property: "field" },
            { value: 0, property: "field" },
            { value: 7, property: "field" },
        ];
        arrange.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "boolean", error: new ValidationError("The field must be a boolean") });
        });
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: true, property: "field" },
            { value: false, property: "field" },
        ];
        arrange.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: "boolean", error: new ValidationError("The field must be a boolean") });
        });
    });

    it("should combine two ao more validation rule", () => {
        let validator = ValidatorRules.values(null, "field");
        expect(() => {
            validator.required().string().maxLength(3);
        }).toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values(5, "field");
        expect(() => {
            validator.required().string().maxLength(3);
        }).toThrow(new ValidationError("The field must be a string"));

        validator = ValidatorRules.values("asdasd", "field");
        expect(() => {
            validator.required().string().maxLength(3);
        }).toThrow(new ValidationError("The field must be less than 3 characters"));


        validator = ValidatorRules.values("asdf", "field");
        expect(() => {
            validator.required().string().maxLength();
        }).not.toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values(null, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values(5, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError("The field must be a boolean"));

        validator = ValidatorRules.values(true, "field");
        expect(() => {
            validator.required().boolean();
        }).not.toThrow(new ValidationError("The field must be a boolean"));

    });
});