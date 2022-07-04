import ValueObject from "./value-objects";

class StubValueObject extends ValueObject {

}


describe('ValueObjects Unit Test', () => {

    it('should set value', () => {
        const vo = new StubValueObject('String Value');
        expect(vo.value).toBe('String Value');

        const vo1 = new StubValueObject({ prop1: 'Value1' });
        expect(vo1 + "").toStrictEqual(JSON.stringify({ prop1: 'Value1' }));
    });

    it('should return string representation of value', () => {
        const date = new Date();
        let arrange = [
            { received: "", expected: "" },
            { received: "Fake teste", expected: "Fake teste" },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: false, expected: "false" },
            { received: true, expected: "true" },
            { received: date, expected: date.toString() },
            { received: { prop1: 'Value1' }, expected: JSON.stringify({ prop1: 'Value1' }) },
        ];

        arrange.forEach(value => {
            const vo = new StubValueObject(value.received);
            expect(vo + "").toBe(value.expected);
        });
    });

    it("should be a immutable object", () => {
        const obj = {
            prop1: "Value1",
            deep: {
                prop2: "value2",
                prop3: new Date()
            }
        };
        
        const vo = new StubValueObject(obj);

        expect(() => {
            (vo as any).value.prop1 = "Test";
        }).toThrow();

        expect(() => {
            (vo as any).values.deep.prop2 = "Test";
        }).toThrow();

        expect(vo.value.deep.prop3).toBeInstanceOf(Date);
    });

});