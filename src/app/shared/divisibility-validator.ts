import { ValidatorFn, AbstractControl } from '@angular/forms';
import { DivisibilityChecker } from '../classes/divisibility-checker';

export function DivisibilityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const checker = new DivisibilityChecker(control.value);
        const valid = control.value === ''
            || checker.isDivisibleByThree()
            || checker.isDivisibleByFive();

        return valid ? null : { 'notDivisible': control.value };
    };
}
