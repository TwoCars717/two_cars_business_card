import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { TicketStatus } from '../../main/models/ticketStatus';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
    animations: [
      trigger('errorAnimation', [
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(-5px)',
            height: 0
          }),
          animate('1200ms ease-out', style({
            opacity: 1,
            transform: 'translateY(0)',
            height: '*'
          }))
        ]),
        transition(':leave', [
          animate('1200ms ease-in', style({
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
          animate('1200ms ease-in-out', style({
            opacity: 1,
          }))
        ])
      ])
    ]
})
export class ConfirmationComponent {
  ticketStatus: TicketStatus = TicketStatus.NotSent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ticketStatus = params['status'] as TicketStatus;
      console.log(this.ticketStatus);
    });
  }
}
