import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-marker-details-sidebar',
  templateUrl: './marker-details-sidebar.component.html',
  styleUrls: ['./marker-details-sidebar.component.scss']
})
export class MarkerDetailsSidebarComponent implements OnInit {

  @Input('showLoader') showLoader;
  @Input('markerDetails') markerDetails;
  @Output() markerClick = new EventEmitter();
  @ViewChild('nav') ds: NgImageSliderComponent;

  
  sliderWidth: Number = 370;
  sliderImageWidth: Number = 376;
  sliderImageHeight: Number = 200;
  sliderArrowShow: Boolean = true;
  sliderInfinite: Boolean = false;
  sliderImagePopup: Boolean = true;
  sliderAutoSlide: Boolean = false;
  sliderSlideImage: Number = 1;
  sliderAnimationSpeed: any = 1;
  constructor() { }

  ngOnInit() {
    console.log(this.markerDetails);
    this.showLoader = false;
  }
  markerClicked(marker) {
    console.log(marker);
    this.markerClick.emit(marker);
  }

  imageOnClick(index) {
    console.log('index', index);
  }

  arrowOnClick(event) {
    console.log('arrow click event', event);
  }
  lightboxArrowClick(event) {
    console.log('popup arrow click', event);
}

  prevImageClick() {
      this.ds.prev();
  }

  nextImageClick() {
      this.ds.next();
  }

}
