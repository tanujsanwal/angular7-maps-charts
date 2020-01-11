import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SplitStringPipe } from './pipes/split-string.pipe';
import { ImageFormaterPipe } from './pipes/image-formater.pipe';
import { IconUrlPipe } from './pipes/icon-url.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    SplitStringPipe,
    ImageFormaterPipe,
    IconUrlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,

    NavbarComponent,

    SplitStringPipe,
    ImageFormaterPipe,
    IconUrlPipe
  ]
})
export class SharedModule { }
