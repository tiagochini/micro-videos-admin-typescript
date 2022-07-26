import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from "./category.validator";

describe("CategoryValidator Test", () => {

    let validator: CategoryValidator;

    beforeEach(() => {
        validator = CategoryValidatorFactory.create();
    });

    test('invalidation cases for name fields', () => {
        expect({ validator, data: null }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be longer than or equal to 3 characters',
                'name must be shorter than or equal to 255 characters'
            ]
        });

        expect({ validator, data: undefined }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be longer than or equal to 3 characters',
                'name must be shorter than or equal to 255 characters'
            ]
        });

        expect({ validator, data: { name: "" } }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be longer than or equal to 3 characters',
            ]
        });


        expect({ validator, data: {name: 3} }).containsErrorMessages({
            name: [
                'name must be a string',
                'name must be longer than or equal to 3 characters',
                'name must be shorter than or equal to 255 characters'
            ]
        });

        expect({ validator, data: {name: 't'} }).containsErrorMessages({
            name: [
                'name must be longer than or equal to 3 characters',
            ]
        });

        expect({ validator, data: {name:'t'.repeat(256)} }).containsErrorMessages({
            name: [
                'name must be shorter than or equal to 255 characters'
            ]
        });

    });

    test('invalidation cases for description fields', () => {
        expect({ validator, data: { name: "test", description: 3 as any } as CategoryRules }).containsErrorMessages({
            description: [
                "description must be a string",
                "description must be longer than or equal to 3 characters",
                "description must be shorter than or equal to 1000 characters",
            ]
        });

        expect({ validator, data: { name: "test", description: "a" } as CategoryRules }).containsErrorMessages({
            description: [
                "description must be longer than or equal to 3 characters",
            ]
        });

        expect({ validator, data: { name: "test", description: "a".repeat(1001) } as CategoryRules }).containsErrorMessages({
            description: [
                "description must be shorter than or equal to 1000 characters",
            ]
        });
    });

    test('invalidation cases for is_active fields', () => {
        expect({ validator, data: { name: "test", is_active: 3 as any } as CategoryRules }).containsErrorMessages({
            is_active: [
                "is_active must be a boolean value",
            ]
        });
    });

    test('validation cases for all fields', () => {
        const arrange = [
            { expected: { name: 'test' } },
            { expected: { name: 'test', is_active: false } },
            { expected: { name: 'test', description: "asdffff" } },
            { expected: { name: 'test', description: "asdffff", is_active: false } }
        ];

        arrange.forEach(({ expected }) => {
            const isValid = validator.validate(expected as CategoryRules);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(new CategoryRules(expected));
        });
    });

});