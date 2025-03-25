import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TicketStatus } from '../models/ticketStatus';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [
    trigger('errorAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-5px)',
          height: 0
        }),
        animate('200ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0)',
          height: '*'
        }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({
          opacity: 0,
          transform: 'translateY(-5px)',
          height: 0
        }))
      ])
    ]),
    trigger('swapAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('500ms ease-in-out', style({
          opacity: 1,
        }))
      ])
    ])
  ]
})

export class ContactUsComponent {
  @Output() formSubmitEvent = new EventEmitter<FormGroup>();
  @Input() ticketStatus: TicketStatus = TicketStatus.NotSent;

  contactUsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactUsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['+380', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]]
    });
  }

  get nameControl() { return this.contactUsForm.get('name'); }
  get phoneControl() { return this.contactUsForm.get('phoneNumber'); }

  onSubmit() {
    this.formSubmitEvent.emit(this.contactUsForm);
  }

  onTouchStart(event: Event) {
    if (this.contactUsForm.valid) {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
