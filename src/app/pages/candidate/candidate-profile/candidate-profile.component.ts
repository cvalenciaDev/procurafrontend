import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { FooterTopComponent } from '../../../components/footer-top/footer-top.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ProviderService, ProviderProfile, GalleryItem } from '../../../services/provider.service';
import { BidService } from '../../../services/bid.service';
import { Bid } from '../../../models/project.model';

@Component({
  selector: 'app-candidate-profile',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.scss',
})
export class CandidateProfileComponent implements OnInit {
  provider: ProviderProfile | null = null;
  loading = true;
  error = '';
  isOwnProfile = false;
  bids: Bid[] = [];
  gallery: GalleryItem[] = [];
  lightboxSrc: string | null = null;

  constructor(
    private readonly providerService: ProviderService,
    private readonly bidService: BidService,
    private readonly route: ActivatedRoute,
    private readonly locationService: Location,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.providerService.getById(+id).subscribe({
        next: (res) => {
          this.provider = res.data;
          this.loading = false;
          if (res.data.id) this.loadGallery(res.data.id);
        },
        error: () => {
          this.error = 'No se pudo cargar el perfil del proveedor.';
          this.loading = false;
        },
      });
    } else {
      this.isOwnProfile = true;
      this.providerService.getMyProfile().subscribe({
        next: (res) => {
          this.provider = res.data;
          this.loading = false;
          if (res.data.id) this.loadGallery(res.data.id);
          this.bidService.getMyBids().subscribe({
            next: (bidRes) => {
              this.bids = Array.isArray(bidRes?.data) ? bidRes.data : [];
            },
            error: () => { this.bids = []; }
          });
        },
        error: () => {
          this.error = 'No se pudo cargar el perfil de proveedor.';
          this.loading = false;
        },
      });
    }
  }

  loadGallery(id: number): void {
    this.providerService.getGallery(id).subscribe({
      next: (res) => { this.gallery = res.data || []; },
      error: () => { this.gallery = []; },
    });
  }

  openLightbox(src: string): void { this.lightboxSrc = src; }
  closeLightbox(): void { this.lightboxSrc = null; }

  deleteGalleryItem(item: GalleryItem): void {
    if (!item.id || !this.provider?.id) return;
    this.providerService.deleteGalleryItem(this.provider.id, item.id).subscribe({
      next: () => { this.gallery = this.gallery.filter(g => g.id !== item.id); },
      error: () => {},
    });
  }

  goBack(): void {
    this.locationService.back();
  }

  getInitials(name: string): string {
    return name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || '??';
  }
}
