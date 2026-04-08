import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { FooterTopComponent } from '../../../components/footer-top/footer-top.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { CompanyService, CompanyProfile } from '../../../services/company.service';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-employer-profile',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss',
})
export class EmployerProfileComponent implements OnInit {
  company: CompanyProfile | null = null;
  loading = true;
  error = '';
  isOwnProfile = false;
  currentUserType: string | null = null;
  projects: Project[] = [];

  private readonly categoryConfig: Record<string, string> = {
    CONSTRUCTION: 'Construcción',
    MINING: 'Minería',
    AGROINDUSTRY: 'Agroindustria',
    OTHER: 'Otro',
  };

  constructor(
    private readonly companyService: CompanyService,
    private readonly projectService: ProjectService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUserType = user?.primaryType ?? null;
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.companyService.getById(Number(id)).subscribe({
        next: (res) => {
          this.company = res.data;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el perfil de empresa.';
          this.loading = false;
        },
      });
    } else {
      this.isOwnProfile = true;
      this.companyService.getMyProfile().subscribe({
        next: (res) => {
          this.company = res.data;
          this.loading = false;
          this.projectService.getMyProjects().subscribe({
            next: (projRes: any) => {
              let all: Project[] = [];
              if (Array.isArray(projRes)) {
                all = projRes;
              } else if (Array.isArray(projRes?.data)) {
                all = projRes.data;
              } else if (Array.isArray(projRes?.data?.content)) {
                all = projRes.data.content;
              } else if (Array.isArray(projRes?.content)) {
                all = projRes.content;
              }
              this.projects = all;
            },
            error: () => { this.projects = []; }
          });
        },
        error: () => {
          this.error = 'No se pudo cargar el perfil de empresa.';
          this.loading = false;
        },
      });
    }
  }

  get activeProjectsCount(): number {
    return this.projects.filter(p =>
      p.status === 'PUBLISHED' || p.status === 'IN_PROGRESS'
    ).length;
  }

  goBack(): void {
    this.location.back();
  }

  categoryLabel(cat: string): string {
    return this.categoryConfig[cat] ?? cat;
  }
}
