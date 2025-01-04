import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselCustomerComponent } from './carousel-customer/carousel-customer.component';
import { ServicesOverviewComponent } from './services-overview/services-overview.component';
import { PurchasedCarsGridComponent } from './purchased-cars-grid/purchased-cars-grid.component';
import { StagesOfWorkingComponent } from './stages-of-working/stages-of-working.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { SingleMediaPlayerComponent } from './single-media-player/single-media-player.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoaderComponent } from './loader/loader.component';
import { YouTubeMediaPlayerComponent } from './you-tube-media-player/you-tube-media-player.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MainComponent, HeaderComponent, FooterComponent, CarouselCustomerComponent, ServicesOverviewComponent, PurchasedCarsGridComponent, SingleMediaPlayerComponent, StagesOfWorkingComponent, HeroSectionComponent, ContactUsComponent, LoaderComponent, YouTubeMediaPlayerComponent, SafeUrlPipe],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule { }
