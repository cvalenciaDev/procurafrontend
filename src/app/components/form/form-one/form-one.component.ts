import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

@Component({
  selector: 'app-form-one',
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './form-one.component.html',
  styleUrl: './form-one.component.scss'
})
export class FormOneComponent {
  loction = ['Abancay','Andahuaylas','Arequipa','Ayacucho','Cajamarca','Cerro de Pasco','Chiclayo','Chimbote','Cusco','Huancayo','Huánuco','Huaraz','Ica','Ilo','Iquitos','Jaén','Juliaca','Lima','Moquegua','Moyobamba','Nasca','Piura','Pucallpa','Puerto Maldonado','Puno','Sullana','Tacna','Tarapoto','Trujillo','Tumbes'] ;
  type = ['Part Time','Freelancer','Remote Work','Office Work']
  dropdownSettings = {
    singleSelection: true,
  }
}
