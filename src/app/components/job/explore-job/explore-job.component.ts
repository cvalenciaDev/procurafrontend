import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-explore-job',
  imports: [CommonModule, RouterLink],
  templateUrl: './explore-job.component.html',
  styleUrl: './explore-job.component.scss'
})
export class ExploreJobComponent implements OnInit {
  projects: Project[] = [];
  loading = true;

  private readonly categoryLabels: Record<string, string> = {
    CONSTRUCTION: 'Construcción',
    MINING: 'Minería',
    AGROINDUSTRY: 'Agroindustria',
    OTHER: 'Otro',
  };

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (response: any) => {
        let all: Project[] = [];
        if (Array.isArray(response)) { all = response; }
        else if (Array.isArray(response?.data)) { all = response.data; }
        else if (Array.isArray(response?.data?.content)) { all = response.data.content; }
        else if (Array.isArray(response?.content)) { all = response.content; }

        this.projects = all
          .filter((p: Project) =>
            (p.status === 'PUBLISHED' || p.status === 'IN_PROGRESS') && p.isPublic !== false
          )
          .slice(0, 6);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  categoryLabel(cat: string): string {
    return this.categoryLabels[cat] ?? cat;
  }

  totalBids(p: Project): number {
    return p.totalBids ?? p.bidsCount ?? 0;
  }
}
