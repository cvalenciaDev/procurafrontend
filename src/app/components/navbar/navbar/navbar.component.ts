import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as feather from 'feather-icons'
import {NgClickOutsideDirective} from 'ng-click-outside2';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    NgClickOutsideDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() navclass:any

  ngAfterViewInit() {
    feather.replace();
  }

  manu:string = '';
  subManu:string = '';
  toggleManu:boolean = false

  isLoggedIn = false;
  needsProfile = false;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const current = this.router.url;
    this.manu = current
    this.subManu = current
    window.scrollTo(0, 0);

    // Suscribirse al estado del usuario
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = this.authService.isLoggedIn();
      this.needsProfile = this.isLoggedIn && !!user && !user.hasCompanyProfile && !user.hasProviderProfile;
    });
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
