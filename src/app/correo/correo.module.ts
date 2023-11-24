import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorreoPageRoutingModule } from './correo-routing.module';

import { CorreoPage } from './correo.page';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorreoPageRoutingModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule, 
  ],
  declarations: [CorreoPage]
})
export class CorreoPageModule {}
