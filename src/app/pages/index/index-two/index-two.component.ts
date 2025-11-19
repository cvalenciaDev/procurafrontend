import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { FormOneComponent } from "../../../components/form/form-one/form-one.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { BlogComponent } from "../../../components/blog/blog.component";
import { BestCompanyComponent } from "../../../components/best-company/best-company.component";
import { AboutOneComponent } from "../../../components/about/about-one/about-one.component";
import { TrandingServicesComponent } from "../../../components/tranding-services/tranding-services.component";
import { JobListComponent } from "../../../components/job/job-list/job-list.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-index-two',
  imports: [
    CommonModule,
    NavbarComponent,
    FormOneComponent,
    FooterComponent,
    BlogComponent,
    BestCompanyComponent,
    AboutOneComponent,
    TrandingServicesComponent,
    JobListComponent,
    ScrollToTopComponent
],
  templateUrl: './index-two.component.html',
  styleUrl: './index-two.component.scss'
})
export class IndexTwoComponent {

}
