import {Converter} from "./converter";
import {Currency} from "./currency";
import {Money} from "./money";

describe('Converter', () => {
    let converter: Converter;

    beforeEach(() => {
        converter = new Converter();
    });

    describe('ConvertInEuros', () => {
        it('should not change the amount if it is already euros', () => {
            const result = converter.convertToEuros(new Money(100, Currency.EUR));
            expect(result).toBe(100);
        });

        it('should apply 0.8 from dollar', () => {
            const result = converter.convertToEuros(new Money(100, Currency.USD));
            expect(result).toBe(80);
        });
    });
});
