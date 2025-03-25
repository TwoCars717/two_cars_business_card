import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Car } from '../models/car';
@Component({
  selector: 'app-purchased-cars-grid',
  templateUrl: './purchased-cars-grid.component.html',
  styleUrl: './purchased-cars-grid.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger(100, [
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class PurchasedCarsGridComponent implements OnInit {
  @Input() showLoadMore!: boolean;
  @Input() displayedItems!: Car[];
  @Input() carServices!: string[];
  @Output() clickButton = new EventEmitter<void>();
  isLessXl: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined')
      this.isLessXl = window.innerWidth < 1280;
  }

  handleButtonClick() {
    this.clickButton.emit();
    console.log('emited' + ' ' + this.showLoadMore + ' ' + this.displayedItems);
  }
}
