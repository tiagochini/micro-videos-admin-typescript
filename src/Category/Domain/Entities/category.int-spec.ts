import {EntityValidationError} from "../../../_Shared/Domain/Errors/validation-error";
import Category from "./category";

describe("Category Integration Test", () => {

    describe("create method", () => {
        it("should a invalid category using a name when create", () => {
            expect(() => {
                new Category({ name: null }); // NOSONAR
            }).containsErrorMessages({
                name: [
                    'name should not be empty',
                    'name must be a string',
                    'name must be longer than or equal to 3 characters',
                    'name must be shorter than or equal to 255 characters'
                ]
            });

            expect(() => {
                new Category({ name: 3 as any }); // NOSONAR
            }).containsErrorMessages({
                name: [
                    'name must be a string',
                    'name must be longer than or equal to 3 characters',
                    'name must be shorter than or equal to 255 characters'
                ]
            });

            expect(() => {
                new Category({ name: "ab" }); // NOSONAR
            }).containsErrorMessages({
                name: [
                    'name must be longer than or equal to 3 characters',
                ]
            });

            expect(() => {
                new Category({ name: "t".repeat(256) }); // NOSONAR
            }).containsErrorMessages({
                name: [
                    'name must be shorter than or equal to 255 characters'
                ]
            });

        });

        it("should a invalid category using description property when create", () => {
            expect(() => {
                new Category({ name: "name", description: 3 as any }); // NOSONAR
            }).containsErrorMessages({
                description: [
                    'description must be a string',
                    'description must be longer than or equal to 3 characters',
                    'description must be shorter than or equal to 1000 characters'
                ]
            });

            expect(() => {
                new Category({ name: "name", description: "a" }); // NOSONAR
            }).containsErrorMessages({
                description: [
                    'description must be longer than or equal to 3 characters',
                ]
            });

            expect(() => {
                new Category({ name: "name", description: "a".repeat(1001) }); // NOSONAR
            }).containsErrorMessages({
                description: [
                    'description must be shorter than or equal to 1000 characters'
                ]
            });
        });

        it("should a invalid category using is_active property when create", () => {
            expect(() => {
                new Category({ name: "name", is_active: 3 as any }); // NOSONAR
            }).containsErrorMessages({
                is_active: [
                    'is_active must be a boolean value'
                ]
            });
        });

        it("should a valid category when create", () => {
            expect(() => {
                new Category({ name: "name" }); //NOSONAR
                new Category({ name: "name", description: "description" }); // NOSONAR
                new Category({ name: "name", description: null }); // NOSONAR
                new Category({ name: "name", is_active: true }); // NOSONAR
                new Category({ name: "name", description: "description", is_active: false }); // NOSONAR
            }).not.toThrow();
        });

    });

    describe("update method", () => {
        it("should a invalid category using a name when update", () => {
            const category = new Category({ name: "name" });

            expect(() => {
                category.update({ name: 3 as any });
            }).containsErrorMessages({
                name: [
                    'name must be a string',
                    'name must be longer than or equal to 3 characters',
                    'name must be shorter than or equal to 255 characters'
                ]
            });

            expect(() => {
                category.update({ name: "ab" });
            }).containsErrorMessages({
                name: [
                    'name must be longer than or equal to 3 characters',
                ]
            });
            expect(() => {
                category.update({ name: "t".repeat(256) });
            }).containsErrorMessages({
                name: [
                    'name must be shorter than or equal to 255 characters'
                ]
            });

        });

        it("should a invalid category using description property when update", () => {
            const category = new Category({ name: "name" });
            expect(() => {
                category.update({ description: 3 as any });
            }).containsErrorMessages({
                description: [
                    'description must be a string',
                    'description must be longer than or equal to 3 characters',
                    'description must be shorter than or equal to 1000 characters'
                ]
            });

            expect(() => {
                category.update({ description: "ab" });
            }).containsErrorMessages({
                description: [
                    'description must be longer than or equal to 3 characters',
                ]
            });

            expect(() => {
                category.update({ description: "a".repeat(1001) });
            }).containsErrorMessages({
                description: [
                    'description must be shorter than or equal to 1000 characters'
                ]
            });
        });

        it("should a valid category update", () => {
            const category = new Category({ name: "name" });
            expect(() => {
                category.update({ name: "name" });
                category.update({ name: "name", description: "description" });
                category.update({ name: "name", description: null });
                category.update({ name: null, description: "description" });
            }).not.toThrow();
        });
    });
});