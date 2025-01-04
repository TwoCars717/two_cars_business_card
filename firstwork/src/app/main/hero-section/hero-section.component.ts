import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  isVideoLoaded = false;
  videoSrc = 'assets/videos/Audi.mp4';
  placeholderImage = 'assets/images/Audi1img.jpg';

  ngOnInit() {
    this.preloadVideo();
  }

  private preloadVideo() {
    const video = new Image();
    video.src = this.videoSrc;

    const preloadVideo = document.createElement('video');
    preloadVideo.src = this.videoSrc;
    preloadVideo.load();
  }

  onVideoCanPlay() {
    setTimeout(() => {
      this.isVideoLoaded = true;
      if (this.videoElement) {
        this.videoElement.nativeElement.play()
          .catch(error => console.log('Auto-play prevented:', error));
      }
    }, 100);
  }
}
