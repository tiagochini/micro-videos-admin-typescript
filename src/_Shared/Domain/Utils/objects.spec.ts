import { deepFreeze } from "./objects";

describe("Object Unit Test", () => {

    it("should not freez a scalar value", () => {
        const str = deepFreeze("a");
        expect(typeof str).toBe("string");

        let boolean = deepFreeze(true);
        expect(typeof boolean).toBe("boolean");

        boolean = deepFreeze(false);
        expect(typeof boolean).toBe("boolean");

        const num = deepFreeze(10);
        expect(typeof num).toBe("number");
    });

    it("should be a immutable object", () => {
        const obj = deepFreeze({ prop1: "Value1", deep: { prop2: "value2", prop3: new Date() } });
        expect(typeof obj).toBe("object");
        expect(() => {
            (obj as any).prop1 = "Value2";
        }).toThrow();

        expect(() => {
            (obj as any).deep.prop2 = "Value2";
        }).toThrow();

        expect(obj.deep.prop3).toBeInstanceOf(Date);
    });
});