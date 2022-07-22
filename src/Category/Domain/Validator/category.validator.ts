import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import ClassValidatorFields from "../../../_Shared/Domain/Validator/class-validator-fields";
import ValidatorFieldsInterface from "../../../_Shared/Domain/Validator/validator-fields.interface";
import { CategoryProperties } from "../Entities/category";

export class CategoryRules {
    @MaxLength(255)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(1000)
    @MinLength(3)
    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({ name, description, is_active, created_at }: CategoryProperties) {
        Object.assign(this, { name, description, is_active, created_at });
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> implements ValidatorFieldsInterface<CategoryRules> {


    validate(data: CategoryRules): boolean {
        return super.validate(new CategoryRules(data ?? {} as any));
    }
}

export default class CategoryValidatorFactory {
    static create(): CategoryValidator {
        return new CategoryValidator();
    }
}