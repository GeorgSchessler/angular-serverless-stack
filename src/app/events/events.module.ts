import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { MdListModule, MdCardModule, MdButtonModule, MdInputModule } from '@angular/material';
import { EventsService } from './events.service';

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule
  ],
  declarations: [
      EventsComponent
    ],
  providers: [
    EventsService
]
})
export class EventsModule { }
