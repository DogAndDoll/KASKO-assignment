export class DivisibilityChecker {
    private value: string;

    constructor(value: string) {
        this.value = this.normalize(value);
    }

    public isDivisibleByThree(): boolean {
        if (!this.value) {
            return false;
        }

        let reducibleValue = this.value;
        while (reducibleValue.length > 1) {
            reducibleValue = this.reduceToDigitSum(reducibleValue);
        }

        return parseInt(reducibleValue, 10) % 3 === 0;
    }

    public isDivisibleByFive(): boolean {
        if (!this.value) {
            return false;
        }

        const lastChar = this.value.slice(-1);

        return lastChar === '0' || lastChar === '5';
    }

    private normalize(value: string): string {
        const regex = /^-?\d+\.?\d*$/;
        if (!regex.test(value)) {
            return null;
        }

        return value.replace(/[^0-9]/, '');
    }

    private reduceToDigitSum(value: string): string {
        const digits = value.split('');
        const sum = digits.reduce((a, b) => a + parseInt(b, 10), 0);

        return sum.toString();
    }
}
