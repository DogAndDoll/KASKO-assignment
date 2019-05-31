import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let inputElement: HTMLInputElement;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormComponent],
            imports: [
                BrowserModule,
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [{ provide: FormBuilder, useValue: formBuilder }]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(FormComponent);
                component = fixture.componentInstance;
                inputElement = fixture.debugElement.query(By.css('#formInput')).nativeElement;
            });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render greeting in a h2 tag', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Hello There!');
    });

    it('should render lead in a p tag', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain(
            'This is a task demonstrating my knowledge developing applications with Angular.');
    });

    it('test is invalid input', () => {
        component.form.controls['formInput'].setValue('test');
        expect(component.form.valid).toBeFalsy();
    });

    it('non divisible numbers are invalid', () => {
        component.form.controls['formInput'].setValue('17');
        expect(component.form.valid).toBeFalsy();
    });

    it('only digits', () => {
        component.form.controls['formInput'].setValue('1 5');
        expect(component.form.valid).toBeFalsy();
    });

    it('0 is divisible by anything', () => {
        component.form.controls['formInput'].setValue('0');
        expect(component.form.valid).toBeTruthy();
    });

    it('form should be valid', () => {
        component.form.controls['formInput'].setValue('3');
        expect(component.form.valid).toBeTruthy();
    });

    it('form should be valid with negatives too', () => {
        component.form.controls['formInput'].setValue('-3');
        expect(component.form.valid).toBeTruthy();
    });

    it('output must be Foo', () => {
        component.form.controls['formInput'].patchValue('3');
        inputElement.dispatchEvent(new Event('input'));
        expect(component.form.controls['formOutput'].value === 'Foo').toBeTruthy();
    });

    it('output must be Bar', () => {
        component.form.controls['formInput'].patchValue('5');
        inputElement.dispatchEvent(new Event('input'));
        expect(component.form.controls['formOutput'].value === 'Bar').toBeTruthy();
    });

    it('output must be FooBar', () => {
        component.form.controls['formInput'].patchValue('15');
        inputElement.dispatchEvent(new Event('input'));
        expect(component.form.controls['formOutput'].value === 'FooBar').toBeTruthy();
    });

    it('output must be Foo on huge input', () => {
        component.form.controls['formInput'].patchValue('39393939393939390000000000039393939393939666666666666333333333999999999');
        inputElement.dispatchEvent(new Event('input'));
        expect(component.form.controls['formOutput'].value === 'Foo').toBeTruthy();
    });

    it('output must be Bar input', () => {
        component.form.controls['formInput'].patchValue('393939393939393900000000000393939393939396666666666663333333339999999995');
        inputElement.dispatchEvent(new Event('input'));
        expect(component.form.controls['formOutput'].value === 'Bar').toBeTruthy();
    });

    it('output must be FooBar input', () => {
        component.form.controls['formInput'].patchValue('665465465465465465465479879879879879879879879879879874454555555555555');
        inputElement.dispatchEvent(new Event('input'));
        expect(component.form.controls['formOutput'].value === 'FooBar').toBeTruthy();
    });
});
