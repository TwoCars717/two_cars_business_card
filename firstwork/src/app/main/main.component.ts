import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { TicketStatus } from './models/ticketStatus';
import { carListing } from './store/carListing'
import { Car } from './models/car';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  ticketStatus: TicketStatus = TicketStatus.NotSent;

  constructor(private mainService: MainService) {

  }

  carListing: Car[] = carListing;

  displayedItems: Car[] = [];
  private itemsPerClick: number = 3;

  ngOnInit() {
    this.loadMoreItems();
  }

  handleButtonClick() {
    this.loadMoreItems();
  }

  loadMoreItems() {
    const nextIndex = this.displayedItems.length;
    const newItems = this.carListing.slice(nextIndex, nextIndex + this.itemsPerClick);

    this.displayedItems = [...this.displayedItems, ...newItems];
  }

  submitTicketToCrm(formGroup: FormGroup) {
    this.mainService.submitTicketToCrm(formGroup.value.name, formGroup.value.phoneNumber)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle the error and log it
          console.error('Error occurred while submitting ticket:', error);
          this.ticketStatus = TicketStatus.NotSent;

          // Optionally show a message to the user here, if needed
          // this.toastrService.error('Failed to submit ticket');

          // Re-throw the error so it can be handled further up if needed
          return throwError(() => new Error('Failed to submit ticket'));
        })
      )
      .subscribe({
        next: (response) => {
          // Handle successful response
          this.mainService.assignTicketToAdminUser(response.data.orderId)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                // Handle the error and log it
                // console.error('Error occurred while assigning ticket admin user:', error);
                this.ticketStatus = TicketStatus.NotSent;


                // Optionally show a message to the user here, if needed
                // this.toastrService.error('Failed to submit ticket');

                // Re-throw the error so it can be handled further up if needed
                return throwError(() => new Error('Failed to assign ticket to admin user'));
              }))
            .subscribe({
              next: (response) => {
                this.ticketStatus = TicketStatus.Recieved;
              }
            });
        }
      });
  }
}
