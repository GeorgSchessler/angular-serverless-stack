import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { MdListModule, MdCardModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdButtonModule,
    MdCardModule
  ],
  declarations: [EventsComponent]
})
export class EventsModule { }
