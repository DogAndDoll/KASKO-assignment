import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DivisibilityValidator } from '../shared/divisibility-validator';
import { DivisibilityChecker } from '../classes/divisibility-checker';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.sass']
})
export class FormComponent {
    form = new FormGroup({
        'formInput': new FormControl('', DivisibilityValidator()),
        'formOutput': new FormControl({ value: '', disabled: true })
    });

    get formInput() { return this.form.get('formInput'); }
    get formOutput() { return this.form.get('formOutput'); }

    setOutputValue(): void {
        let value = '';

        if (this.form && this.form.valid) {
            const checker = new DivisibilityChecker(this.formInput.value);

            const divisibleByThree = checker.isDivisibleByThree();
            const divisibleByFive = checker.isDivisibleByFive();

            if (divisibleByThree && divisibleByFive) {
                value = 'FooBar';
            } else if (divisibleByFive) {
                value = 'Bar';
            } else if (divisibleByThree) {
                value = 'Foo';
            }

        }

        this.formOutput.setValue(value);
    }
}
