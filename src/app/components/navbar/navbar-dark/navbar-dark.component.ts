import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as feather from 'feather-icons'

@Component({
  selector: 'app-navbar-dark',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar-dark.component.html',
  styleUrl: './navbar-dark.component.scss'
})
export class NavbarDarkComponent {
@Input() navclass:any

  ngAfterViewInit() {
    feather.replace();
  }

  manu:string = '';
  subManu:string = '';
  toggleManu:boolean = false

  constructor(private router: Router) {}

  ngOnInit() {
    const current = this.router.url;
    this.manu = current
    this.subManu = current
    window.scrollTo(0, 0);
  }

  openManu(item:string){
    this.subManu = item
  }

  toggleMenu(){
    this.toggleManu = !this.toggleManu
  }

  scroll:boolean = false

  @HostListener("window:scroll",['event'])
  
  onhandlerScroll(){
    if (window.scrollY > 0) {
      this.scroll = true
    }else{
      this.scroll = false
    }
  }

  searchMenu = false

  onClickedOutside(e: Event) {
    this.searchMenu = false
  }

  userMenu = false

  onClickedOutside2(e: Event) {
    this.userMenu = false
  }
}
