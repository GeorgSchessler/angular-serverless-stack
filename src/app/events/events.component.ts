import { Component, OnInit } from '@angular/core';
import { events } from './events';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';


@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.styl']
})
export class EventsComponent implements OnInit {

    public eventList = new BehaviorSubject([]);
    public dateList = new BehaviorSubject([]);
    public city = new BehaviorSubject('');
    public searchValue = new BehaviorSubject('');

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => { if (params.city) this.city.next(params.city); });

        this.eventList.subscribe(allEvents => this.dateList.next(allEvents.map(event => event['date'])
            .filter((elem, pos, arr) => arr.indexOf(elem) === pos)));

        Observable.combineLatest(this.city, this.searchValue).subscribe((values) => this.eventList.next(events
            .filter(event => values[0] !== '' ? event.city === values[0] : true)
            .filter(event => values[1] !== '' ? JSON.stringify(event).toLowerCase().includes(values[1].toLowerCase()) : true))
        );
    }

    routeWebsite(ref: string) {
        window.location.href = ref;
    }

    routeFacebook(ref: string) {
        window.location.href = 'https://www.facebook.com/' + ref;
    }

    routeMap(address: string) {
        window.location.href = 'https://www.google.com/maps/search/?api=1&query=' + address.replace(' ', '+');
    }
}
