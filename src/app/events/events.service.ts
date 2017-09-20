import { Injectable } from '@angular/core';
import { events as eventsOrigin } from './events';
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

    private weekday = new Array(7);

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
        this.model = store.select('events');

        this.setWeekdays();

        this.events.subscribe(allEvents => this.dates.next(
            getNextDates().map(date => {
                return {
                    title: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
                    date: date,
                    day: this.weekday[date.getDay()],
                    events: allEvents.filter(event => {
                        return event.date === date.getDate() + '.' + (date.getMonth() + 1)
                            || event.weekly === date.getDay().toString();
                    })
                };
            }).filter(date => date.events.length)
        ));

        this.model.subscribe(model => this.events.next(eventsOrigin
            .filter(event => model.cityFilter !== '' ? event.city === model.cityFilter : true)
            .filter(event =>
                model.textFilter !== '' ? JSON.stringify(event).toLowerCase().includes(model.textFilter.toLowerCase()) : true)
        ));
    }

    getDates() {
        return this.dates;
    }

    private setWeekdays() {
        this.weekday[0] = 'Sonntag';
        this.weekday[1] = 'Montag';
        this.weekday[2] = 'Dienstag';
        this.weekday[3] = 'Mittwoch';
        this.weekday[4] = 'Donnerstag';
        this.weekday[5] = 'Freitag';
        this.weekday[6] = 'Samstag';
    }
}

function getNextDates() {
    const dates = [];
    const date = new Date();

    let i;
    for (i = 0; i < 70; ++i) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}
