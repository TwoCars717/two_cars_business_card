import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketStatus } from '../models/ticketStatus';

@Component({
  selector: 'app-quick-car-select',
  templateUrl: './quick-car-select.component.html',
  styleUrl: './quick-car-select.component.css'
})

export class QuickCarSelectComponent implements OnInit {
  @Output() formCarSubmitEvent = new EventEmitter<FormGroup>();
  @Input() ticketStatus: TicketStatus = TicketStatus.NotSent;

  carForm!: FormGroup;
  currentYear = new Date().getFullYear();
  bodyTypes = [
    { value: 'Седан', label: 'Седан' },
    { value: 'Позашляховик', label: 'Позашляховик' },
    { value: 'Хетчбек', label: 'Хетчбек' },
    { value: 'Універсал', label: 'Універсал' },
    { value: 'Купе', label: 'Купе' },
    { value: 'Мінівен', label: 'Мінівен' },
    { value: 'Кабріолет', label: 'Кабріолет' },
    { value: 'Пікап', label: 'Пікап' },
    { value: 'Лімузин', label: 'Лімузин' },
    { value: 'Ліфтбек', label: 'Ліфтбек' },
    { value: 'Родстер', label: 'Родстер' },
    { value: 'Фастбек', label: 'Фастбек' },
    { value: 'Мікровен', label: 'Мікровен' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.carForm = this.fb.group({
      bodyType: ['', Validators.required],
      priceMin: [null, [Validators.required, Validators.min(1000)]],
      priceMax: [null, [Validators.required, Validators.max(100000)]],
      yearMin: [null, [Validators.required, Validators.min(1980)]],
      yearMax: [null, [Validators.required, Validators.max(this.currentYear)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['+380', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]]
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      console.log(this.carForm.value);
      this.formCarSubmitEvent.emit(this.carForm);
    } else {
      // Позначити всі поля як touched для відображення помилок
      Object.keys(this.carForm.controls).forEach(key => {
        const control = this.carForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onTouchStart(event: Event) {
    event.preventDefault()
    this.onSubmit();
  }

  // Хелпери для валідації
  get bodyTypeControl() { return this.carForm.get('bodyType'); }
  get nameControl() { return this.carForm.get('name'); }
  get phoneControl() { return this.carForm.get('phone'); }
  get priceMinControl() { return this.carForm.get('priceMin'); }
  get priceMaxControl() { return this.carForm.get('priceMax'); }
  get yearMinControl() { return this.carForm.get('yearMin'); }
  get yearMaxControl() { return this.carForm.get('yearMax'); }
}
