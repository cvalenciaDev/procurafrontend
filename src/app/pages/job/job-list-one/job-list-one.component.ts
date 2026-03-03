import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { FormOneComponent } from "../../../components/form/form-one/form-one.component";
import { FeatureOneComponent } from "../../../components/feature/feature-one/feature-one.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-job-list-one',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FormOneComponent,
    FeatureOneComponent,
    FooterTopComponent,
    ScrollToTopComponent
  ],
  templateUrl: './job-list-one.component.html',
  styleUrl: './job-list-one.component.scss'
})
export class JobListOneComponent implements OnInit {
  jobData: Project[] = [];
  loading = true;
  error = '';

  // Paginación
  currentPage = 1;
  itemsPerPage = 6;

  private categoryConfig: Record<string, { icon: string; color: string }> = {
    'Tecnología':    { icon: 'mdi-laptop',                color: '#2563eb' },
    'Electricidad':  { icon: 'mdi-flash',                 color: '#f59e0b' },
    'Contabilidad':  { icon: 'mdi-calculator-variant',    color: '#10b981' },
    'Construcción':  { icon: 'mdi-hard-hat',              color: '#f97316' },
    'Diseño':        { icon: 'mdi-palette',               color: '#8b5cf6' },
    'Logística':     { icon: 'mdi-truck-fast',            color: '#06b6d4' },
    'Consultoría':   { icon: 'mdi-account-tie',           color: '#6366f1' },
    'Alimentación':  { icon: 'mdi-food',                  color: '#ec4899' },
    'Seguridad':     { icon: 'mdi-shield-check',          color: '#14b8a6' },
    'Marketing':     { icon: 'mdi-bullhorn',              color: '#e11d48' },
    'Mantenimiento': { icon: 'mdi-wrench',                color: '#78716c' },
  };

  constructor(private projectService: ProjectService) {}

  getCategoryIcon(category: string): string {
    return this.categoryConfig[category]?.icon || 'mdi-briefcase';
  }

  getCategoryColor(category: string): string {
    return this.categoryConfig[category]?.color || '#64748b';
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        console.log('Proyectos cargados:', response);
        this.jobData = response.data?.length ? response.data : this.getMockData();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando proyectos, usando datos mock:', err);
        this.jobData = this.getMockData();
        this.error = '';
        this.loading = false;
      }
    });
  }

  private getMockData(): Project[] {
    return [
      { id: 1, title: 'Desarrollo de plataforma web corporativa', description: 'Se requiere desarrollo completo de sitio web corporativo con panel de administración', category: 'Tecnología', budgetMin: 5000, budgetMax: 15000, location: 'Lima', deadline: '2026-04-15', status: 'Abierto', createdAt: '2026-02-20', companyId: 1 },
      { id: 2, title: 'Mantenimiento de redes eléctricas industriales', description: 'Mantenimiento preventivo y correctivo de instalaciones eléctricas', category: 'Electricidad', budgetMin: 8000, budgetMax: 20000, location: 'Arequipa', deadline: '2026-03-30', status: 'Abierto', createdAt: '2026-02-18', companyId: 2 },
      { id: 3, title: 'Auditoría contable y financiera 2025', description: 'Auditoría integral de estados financieros del período 2025', category: 'Contabilidad', budgetMin: 3000, budgetMax: 8000, location: 'Lima', deadline: '2026-05-01', status: 'Abierto', createdAt: '2026-02-15', companyId: 3 },
      { id: 4, title: 'Construcción de almacén logístico', description: 'Construcción de nave industrial de 500m2 para almacenamiento', category: 'Construcción', budgetMin: 50000, budgetMax: 120000, location: 'Callao', deadline: '2026-06-30', status: 'Abierto', createdAt: '2026-02-14', companyId: 1 },
      { id: 5, title: 'Diseño de identidad visual corporativa', description: 'Creación de logo, manual de marca y papelería institucional', category: 'Diseño', budgetMin: 2000, budgetMax: 5000, location: 'Cusco', deadline: '2026-03-20', status: 'Abierto', createdAt: '2026-02-12', companyId: 4 },
      { id: 6, title: 'Servicio de transporte de carga pesada', description: 'Transporte de maquinaria industrial desde Lima a Trujillo', category: 'Logística', budgetMin: 4000, budgetMax: 10000, location: 'Trujillo', deadline: '2026-03-25', status: 'Abierto', createdAt: '2026-02-10', companyId: 2 },
      { id: 7, title: 'Implementación de sistema ERP', description: 'Configuración e implementación de sistema ERP para gestión empresarial', category: 'Tecnología', budgetMin: 15000, budgetMax: 40000, location: 'Lima', deadline: '2026-07-01', status: 'Abierto', createdAt: '2026-02-08', companyId: 5 },
      { id: 8, title: 'Consultoría en seguridad y salud ocupacional', description: 'Evaluación de riesgos y plan de seguridad laboral', category: 'Consultoría', budgetMin: 3500, budgetMax: 7000, location: 'Piura', deadline: '2026-04-10', status: 'Abierto', createdAt: '2026-02-06', companyId: 3 },
      { id: 9, title: 'Servicio de catering corporativo', description: 'Servicio de alimentación para eventos empresariales de 200 personas', category: 'Alimentación', budgetMin: 6000, budgetMax: 12000, location: 'Lima', deadline: '2026-03-15', status: 'Urgente', createdAt: '2026-02-05', companyId: 1 },
      { id: 10, title: 'Instalación de sistema de videovigilancia', description: 'Instalación de 20 cámaras IP con sistema de monitoreo remoto', category: 'Seguridad', budgetMin: 8000, budgetMax: 18000, location: 'Arequipa', deadline: '2026-04-20', status: 'Abierto', createdAt: '2026-02-03', companyId: 4 },
      { id: 11, title: 'Desarrollo de app móvil Android/iOS', description: 'Aplicación móvil para gestión de pedidos y delivery', category: 'Tecnología', budgetMin: 12000, budgetMax: 30000, location: 'Lima', deadline: '2026-06-15', status: 'Abierto', createdAt: '2026-02-01', companyId: 2 },
      { id: 12, title: 'Remodelación de oficinas administrativas', description: 'Remodelación integral de oficinas de 300m2 incluyendo mobiliario', category: 'Construcción', budgetMin: 25000, budgetMax: 60000, location: 'Lima', deadline: '2026-05-30', status: 'Abierto', createdAt: '2026-01-28', companyId: 5 },
      { id: 13, title: 'Servicio de limpieza industrial', description: 'Limpieza y mantenimiento de planta industrial 24/7', category: 'Mantenimiento', budgetMin: 4000, budgetMax: 9000, location: 'Callao', deadline: '2026-04-01', status: 'Abierto', createdAt: '2026-01-25', companyId: 3 },
      { id: 14, title: 'Campaña de marketing digital', description: 'Gestión de redes sociales, SEO y publicidad digital por 6 meses', category: 'Marketing', budgetMin: 6000, budgetMax: 15000, location: 'Lima', deadline: '2026-03-28', status: 'Urgente', createdAt: '2026-01-22', companyId: 1 },
    ];
  }

  get totalPages(): number {
    return Math.ceil(this.jobData.length / this.itemsPerPage);
  }

  get paginatedData(): Project[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.jobData.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  }
}
