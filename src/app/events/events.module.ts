import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import {MdListModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdListModule
  ],
  declarations: [EventsComponent]
})
export class EventsModule { }
