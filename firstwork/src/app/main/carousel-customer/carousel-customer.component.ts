import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import Splide from '@splidejs/splide';
import { YouTubeMediaPlayerComponent } from '../you-tube-media-player/you-tube-media-player.component';

@Component({
  selector: 'app-carousel-customer',
  templateUrl: './carousel-customer.component.html',
  styleUrl: './carousel-customer.component.css',
})
export class CarouselCustomerComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSlide: number = 0;
  splide?: Splide;
  isVideoPlaying = false;

  @ViewChildren(YouTubeMediaPlayerComponent)
  videoPlayers!: QueryList<YouTubeMediaPlayerComponent>;

  activeIndex: number = 0;

  // Use YouTube video IDs here
  videoSources: string[] = [
    'vDL0JvBmhVU', // Add actual YouTube video IDs
    'xaXhqrVJ1YQ',
    '1T9DFycf6R4',
    'S339fh0Oavk',
    'LgIgY0aEsbM',
    'oback-3tWeg',
  ];

  videoNames: string[] = [
    'Audi A6 3.0TDI (Quattro)',// Add actual YouTube video IDs
    'Hyundai Kona 2019',
    'Audi Q8 Quattro 2019',
    'Ford Focus 2010',
    'Ford Focus 2010',
    'Scoda Superb 2011',
  ];

  ngOnInit() {
    if (this.splide) {
      this.splide.destroy();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof document !== 'undefined')
        this.initializeSplide();
    });
  }

  updateVideoPlayingState(isPlaying: boolean) {
    this.isVideoPlaying = isPlaying;
  }

  private initializeSplide() {
    this.splide = new Splide('#default-slider', {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      pagination: false,
      arrows: false,
      speed: 300,
      easing: 'ease-in-out',
      drag: false,
    }).mount();

    this.splide.on('move', (newIndex) => {
      this.handleSlideChange(newIndex);
    });

    this.splide.on('drag', () => {
      this.videoPlayers.forEach((player) => player.isActive = false);
    });
  }

  private handleSlideChange(newIndex: number) {
    this.currentSlide = newIndex;
    this.videoPlayers.forEach((player, index) => {
      player.isActive = index === newIndex;
    });
    this.activeIndex = newIndex;
  }

  goToSlide(index: number) {
    this.splide?.go(index);
  }

  nextSlide() {
    this.splide?.go('+1');
  }

  prevSlide() {
    this.splide?.go('-1');
  }

  ngOnDestroy() {
    if (this.splide) {
      this.splide.destroy();
    }
  }
}
