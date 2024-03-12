import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[nameValidation]'
})
export class ValidationDirective {
  constructor() { }

  @HostListener('keydown', ['$event'])
  KeyDown(event: KeyboardEvent): boolean {
    // Check if event.key is defined
    if (event.key && event.key.match(/[a-zA-Z ]/g)) {
      return true; // Allow the keypress
    } else {
      event.preventDefault(); // Prevent the keypress
      return false; // Return false to indicate that the keypress is prevented
    }
  }
}
