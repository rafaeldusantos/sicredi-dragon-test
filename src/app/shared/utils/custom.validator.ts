import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
    static spacesOnly(control: AbstractControl): ValidationErrors | null {
        if (control.value.trim().length === 0) {
            return {spacesOnly: true};
        }
        return null;
    }
}
