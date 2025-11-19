import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as feather from 'feather-icons'

@Component({
  selector: 'app-scroll-to-top',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {
  ngAfterViewInit(): void {
    feather.replace();
  }

  scrolled: boolean = false;

  @HostListener("window:scroll", [])

  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
}
  constructor(@Inject(DOCUMENT) private document: Document) {}

  topFunction(e:any) {
    e.preventDefault();
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
}
}
