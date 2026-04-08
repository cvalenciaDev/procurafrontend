import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SearchFilter {
  text: string;
  location: string;
  category: string;
}

@Component({
  selector: 'app-form-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-one.component.html',
  styleUrl: './form-one.component.scss'
})
export class FormOneComponent {
  @Output() searchFilter = new EventEmitter<SearchFilter>();

  locations = ['Abancay','Andahuaylas','Arequipa','Ayacucho','Cajamarca','Cerro de Pasco','Chiclayo','Chimbote','Cusco','Huancayo','Huánuco','Huaraz','Ica','Ilo','Iquitos','Jaén','Juliaca','Lima','Moquegua','Moyobamba','Nasca','Piura','Pucallpa','Puerto Maldonado','Puno','Sullana','Tacna','Tarapoto','Trujillo','Tumbes'];

  categories = [
    { value: 'CONSTRUCTION', label: 'Construcción' },
    { value: 'MINING', label: 'Minería' },
    { value: 'AGROINDUSTRY', label: 'Agroindustria' },
    { value: 'OTHER', label: 'Otro' },
  ];

  text = '';
  location = '';
  category = '';

  onSearch(): void {
    this.searchFilter.emit({ text: this.text, location: this.location, category: this.category });
  }

  onReset(): void {
    this.text = '';
    this.location = '';
    this.category = '';
    this.searchFilter.emit({ text: '', location: '', category: '' });
  }
}
