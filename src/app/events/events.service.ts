import { Injectable } from '@angular/core';
import { events as eventsObject } from './events';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Store } from '@ngrx/store';
import { AppState, Events } from '../app.state';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class EventsService {

    private events = new BehaviorSubject([]);
    private dates = new BehaviorSubject([]);

    model: Observable<Events>;

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
        this.model = store.select('events');

        this.events.subscribe(allEvents => this.dates.next(allEvents.map(event => event['date'])
            .filter((elem, pos, arr) => arr.indexOf(elem) === pos)));

        this.model.subscribe(model => this.events.next(eventsObject
            .filter(event => model.cityFilter !== '' ? event.city === model.cityFilter : true)
            .filter(event =>
                model.textFilter !== '' ? JSON.stringify(event).toLowerCase().includes(model.textFilter.toLowerCase()) : true)
        ));
    }

    getEvents() {
        return this.events;
    }

    getDates() {
        return this.dates;
    }
}
