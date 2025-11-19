import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Navbar2Component } from "../../../components/navbar/navbar2/navbar2/navbar2.component";
import { CategoryOneComponent } from "../../../components/category/category-one/category-one.component";
import { RouterLink } from '@angular/router';
import { ExploreJobComponent } from "../../../components/job/explore-job/explore-job.component";
import { FeatureOneComponent } from "../../../components/feature/feature-one/feature-one.component";
import { BestCompanyComponent } from "../../../components/best-company/best-company.component";
import { BlogComponent } from "../../../components/blog/blog.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-index-one',
  imports: [
    CommonModule,
    RouterLink,
    Navbar2Component,
    CategoryOneComponent,
    ExploreJobComponent,
    FeatureOneComponent,
    BestCompanyComponent,
    BlogComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './index-one.component.html',
  styleUrl: './index-one.component.scss'
})

export class IndexOneComponent implements  AfterViewInit {
  
  @ViewChild('backgroundVideo', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.initializeVideo();
  }

  initializeVideo() {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      
      // Configuraciones importantes
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      
      // Múltiples intentos de reproducción
      this.attemptPlay(video);
      
      // Listener para cuando el video esté listo
      video.addEventListener('canplay', () => {
        this.attemptPlay(video);
      });
      
      // Listener para errores
      video.addEventListener('error', (e) => {
        console.error('Error en el video:', e);
      });
      
      // Asegurar que se reproduzca cuando sea visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.attemptPlay(video);
          }
        });
      });
      observer.observe(video);
    }
  }

  attemptPlay(video: HTMLVideoElement) {
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video reproduciéndose correctamente');
        })
        .catch(error => {
          console.log('Autoplay bloqueado, agregando click listener:', error);
          // Si falla, reproducir al primer click/touch del usuario
          this.enablePlayOnInteraction(video);
        });
    }
  }

  enablePlayOnInteraction(video: HTMLVideoElement) {
    const playOnInteraction = () => {
      video.play().then(() => {
        console.log('Video iniciado después de interacción del usuario');
        // Remover listeners después del primer play
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('scroll', playOnInteraction);
      });
    };
    
    // Agregar listeners para la primera interacción del usuario
    document.addEventListener('click', playOnInteraction, { once: true });
    document.addEventListener('touchstart', playOnInteraction, { once: true });
    document.addEventListener('scroll', playOnInteraction, { once: true });
  }
}






