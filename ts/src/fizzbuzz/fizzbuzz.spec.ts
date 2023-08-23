function fizzBuzz(i: number): string {
    if (i%15 === 0) {
        return "FizzBuzz";
    }
    if (i % 3 === 0) {
        return "Fizz";
    }
    if (i%5 === 0) {
        return "Buzz";
    }
    return i.toString(10)
}

function playFizzBuzz(): string {
    let result = "";
    for (let i = 1; i <= 100; i++) {
        result += `${fizzBuzz(i)}\n`;
    }
    return result;
}

describe('Fizzbuzz', () => {
    function getFizzbuzz(num: number, result: string): string | undefined {
        return result.split('\n')[num - 1] || undefined;
    }

    let fizzbuzzString :string ;
    beforeEach(() => {
        fizzbuzzString = playFizzBuzz();
    })

    it('should return 1 by default', () => {
        expect(getFizzbuzz(1, fizzbuzzString)).toBe("1");
    });

    it('should return 2 after 1', () => {
        expect(getFizzbuzz(2, fizzbuzzString)).toBe("2");
    });

    it('should return Fizz for each multiple of 3', () => {
        expect(getFizzbuzz(3, fizzbuzzString)).toBe("Fizz");
        expect(getFizzbuzz(6, fizzbuzzString)).toBe("Fizz");
    });

    it('should return Buzz for each multiple of 5', () => {
        expect(getFizzbuzz(5, fizzbuzzString)).toBe("Buzz");
        expect(getFizzbuzz(10, fizzbuzzString)).toBe("Buzz");
    });

    it('should return FizzBuzz for each multiple of 15', () => {
        expect(getFizzbuzz(15, fizzbuzzString)).toBe("FizzBuzz");
        expect(getFizzbuzz(30, fizzbuzzString)).toBe("FizzBuzz");
    });
});
