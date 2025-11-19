import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarDarkComponent } from "../../../components/navbar/navbar-dark/navbar-dark.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-candidate-profile-setting',
  imports: [
    CommonModule,
    NavbarDarkComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './candidate-profile-setting.component.html',
  styleUrl: './candidate-profile-setting.component.scss'
})
export class CandidateProfileSettingComponent {
  profileBanner: string = '/assets/images/hero/bg5.jpg';
  profileImage: string = 'assets/images/team/01.jpg';

  loadFile(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'banner') {
          this.profileBanner = e.target.result;
        } else if (type === 'profile') {
          this.profileImage = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
