import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainService } from './main.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketStatus } from './models/ticketStatus';
import { carListing } from './store/carListing'
import { Car } from './models/car';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { carServices } from './store/carServices';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('firstFrame') firstFrame!: ElementRef;


  ticketStatus: TicketStatus = TicketStatus.NotSent;

  showOverlay = true;
  private refreshTimeout: any;

  constructor(private mainService: MainService, private router: Router) {

  }

  carListing: Car[] = carListing;
  carServices: string[] = carServices;

  displayedItems: Car[] = [];
  private itemsPerClick: number = 3;

  ngOnInit() {
    this.loadMoreItems();
    setTimeout(() => {
      this.showOverlay = false;
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.animateBox()
  }

  animateBox() {
    gsap.from('#stages-of-working .text-center', { 
      x:40,
      scale: 0.5,
      y:200,
      opacity:0.3,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#stages-of-working',
        start: 'top 120%',
        end: 'top 40%',
        scrub: 0.9,
      }
    });

    gsap.from('#reviews, .gsapAnimate', {
      y:100,
      ease: 'power4.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '#reviews',
        start: 'top 98%',
        end: 'top 30%',
        scrub: 1,
      }
    })

    gsap.from('#purchased-cars, gsadSimpleAnimation', {
      y: 275,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#purchased-cars', 
        start: 'top 110%',
        end: 'top 50%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    });

    gsap.to('#purchased-cars, gsadSimpleAnimation', {
      opacity: 0,
      x: -10,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#services-overview', 
        start: 'top 16%',
        end: 'top 4%',
        scrub: 1,
      }
    });

    gsap.from('#services-overview, .gsapAnimation', {
      background: '#000000',
      x: '100vw',
      ease: 'power3',
      scrollTrigger: {
        trigger: '#services-overview', 
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      }
    });

    gsap.to('#services-overview, .gsapAnimation', {
      opacity: 0,
      y: -200,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#contact-us', 
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      }
    });

    
    gsap.from('#contact-us', {
      y: 200,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#contact-us', 
        start: 'top 140%',
        end: 'top 40%',
        scrub: 1,
      }
    });
  }

  handleButtonClick() {
    this.loadMoreItems();
  }

  loadMoreItems() {
    clearTimeout(this.refreshTimeout);
    const nextIndex = this.displayedItems.length;
    const newItems = this.carListing.slice(nextIndex, nextIndex + this.itemsPerClick);

    this.displayedItems = [...this.displayedItems, ...newItems];
    
    // Refresh ScrollTrigger with debounce
    this.refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 100);
  }

  submitTicketToCrm(formGroup: FormGroup) {
    this.ticketStatus = TicketStatus.Pending;
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
                this.router.navigate(['/confirmation'], { queryParams: { status: this.ticketStatus } });
              },
              error: () => {
                this.router.navigate(['/confirmation'], { queryParams: { status: this.ticketStatus } });
              }
            });
        },
        error: () => {
          this.router.navigate(['/confirmation'], { queryParams: { status: this.ticketStatus } });
        }
      });
  }
}
