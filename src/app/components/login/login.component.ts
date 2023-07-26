import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private elementRef: ElementRef) {}

  @HostListener('focus')
  addClass() {
    const parent = this.elementRef.nativeElement.parentNode.parentNode;
    parent.classList.add('focus');
  }

  @HostListener('blur')
  removeClass() {
    const parent = this.elementRef.nativeElement.parentNode.parentNode;
    if (this.elementRef.nativeElement.value === '') {
      parent.classList.remove('focus');
    }
  }
}
