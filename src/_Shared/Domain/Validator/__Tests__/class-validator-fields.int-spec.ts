import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import ClassValidatorFields from "../class-validator-fields";

class StubRule {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}

class StubClassValidator extends ClassValidatorFields<StubRule>{
    validate(data: any): boolean {
        return super.validate(new StubRule(data));
    }
}

describe("ValidatorRulesFields Integration Test", () => {
    it("should validate with errors", () => {
        const validator = new StubClassValidator();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.errors).toStrictEqual({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ],
            price: [
                'price should not be empty',
                'price must be a number conforming to the specified constraints'
            ]
        });
        
    });

    it("should validate without errors", () => {
        const validator = new StubClassValidator();
        expect(validator.validate({ name: "asd", price: 7 })).toBeTruthy();
        expect(validator.validatedData).toStrictEqual(new StubRule({ name: "asd", price: 7 }));
    });

});