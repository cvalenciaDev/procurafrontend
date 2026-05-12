import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { CompanyService, CompanyProfile, GalleryItem } from '../../../services/company.service';

@Component({
  selector: 'app-employer-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './employer-profile-edit.component.html',
  styleUrl: './employer-profile-edit.component.scss',
})
export class EmployerProfileEditComponent implements OnInit {
  loading = true;
  saving = false;
  spinnerMsg = 'Cargando perfil...';
  successMsg = '';
  errorMsg = '';
  logoPreview = '';
  logoError = '';
  coverPreview = '';
  coverError = '';
  gallery: GalleryItem[] = [];
  galleryPreviews: string[] = [];
  galleryFiles: File[] = [];
  galleryError = '';

  profile: CompanyProfile = {
    companyName: '',
    description: '',
    industry: '',
    city: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    employeesCount: null,
    foundedYear: null,
    taxId: '',
    website: '',
    address: '',
    logo: '',
    specialty: '',
    internationalPresence: '',
    completedProjects: '',
    fiscalAddress: '',
    maxCapacity: null,
    brochureUrl: '',
  };

  constructor(
    private companyService: CompanyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.companyService.getMyProfile().subscribe({
      next: (res) => {
        this.profile = { ...this.profile, ...res.data };
        this.logoPreview = this.profile.logo || '';
        this.coverPreview = this.profile.coverImageUrl || '';
        this.loading = false;
        if (this.profile.id) { this.loadGallery(this.profile.id); }
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar el perfil.';
        this.loading = false;
      },
    });
  }

  private loadGallery(companyId: number): void {
    this.companyService.getGallery(companyId).subscribe({
      next: (res) => { this.gallery = Array.isArray(res?.data) ? res.data : []; },
      error: () => { this.gallery = []; }
    });
  }

  onGallerySelected(event: Event): void {
    this.galleryError = '';
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    const remaining = 10 - this.galleryFiles.length;
    for (const file of files.slice(0, remaining)) {
      if (file.size > 5 * 1024 * 1024) { this.galleryError = `"${file.name}" supera 5 MB.`; continue; }
      this.galleryFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => { this.galleryPreviews.push(e.target?.result as string); };
      reader.readAsDataURL(file);
    }
    input.value = '';
  }

  removeNewGalleryItem(index: number): void {
    this.galleryFiles.splice(index, 1);
    this.galleryPreviews.splice(index, 1);
  }

  deleteExistingGalleryItem(item: GalleryItem): void {
    if (!this.profile.id || !item.id) return;
    this.companyService.deleteGalleryItem(this.profile.id, item.id).subscribe({
      next: () => { this.gallery = this.gallery.filter(g => g.id !== item.id); },
      error: () => {}
    });
  }

  onLogoSelected(event: Event): void {
    this.logoError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.logoError = 'Solo se permiten imágenes (PNG, JPG, WEBP, GIF).';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.logoError = 'La imagen no debe superar 2 MB.';
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      this.profile.logo = base64;
      this.logoPreview = base64;
    };
    reader.readAsDataURL(file);
  }

  onCoverSelected(event: Event): void {
    this.coverError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.coverError = 'Solo se permiten imágenes (PNG, JPG, WEBP).';
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      this.coverError = 'La imagen no debe superar 4 MB.';
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      this.profile.coverImageUrl = base64;
      this.coverPreview = base64;
    };
    reader.readAsDataURL(file);
  }

  onSave(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.saving = true;
    this.spinnerMsg = 'Guardando cambios...';
    this.companyService.updateMyProfile(this.profile).subscribe({
      next: () => {
        if (this.profile.id && this.galleryFiles.length > 0) {
          this.uploadPendingGallery(this.profile.id);
        } else {
          this.onSaveSuccess();
        }
      },
      error: (err: any) => {
        this.saving = false;
        this.errorMsg = err.error?.message || 'Error al guardar los cambios.';
      },
    });
  }

  private uploadPendingGallery(companyId: number): void {
    this.spinnerMsg = 'Subiendo imágenes...';
    const uploads = this.galleryFiles.map(file => new Promise<void>(resolve => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        this.companyService.addGalleryItem(companyId, { type: 'IMAGE', url }).subscribe({
          next: (res) => { if (res?.data) { this.gallery.push(res.data); } resolve(); },
          error: () => resolve()
        });
      };
      reader.readAsDataURL(file);
    }));
    Promise.all(uploads).then(() => {
      this.galleryFiles = [];
      this.galleryPreviews = [];
      this.onSaveSuccess();
    });
  }

  private onSaveSuccess(): void {
    this.saving = false;
    this.successMsg = '¡Perfil actualizado correctamente!';
    setTimeout(() => this.router.navigate(['/employer-profile']), 1500);
  }

  goBack(): void {
    this.router.navigate(['/employer-profile']);
  }
}
