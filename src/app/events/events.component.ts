import { Component, OnInit } from '@angular/core';
import { events } from './events';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';


@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.styl']
})
export class EventsComponent implements OnInit {

    private eventList = new BehaviorSubject([]);
    private dateList = new BehaviorSubject([]);
    private city = new BehaviorSubject('');


    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.city) {
                this.city.next(params.city);
                this.eventList.next(events.filter((event) => event.city === params.city));
            }
        });

        this.eventList.subscribe(allEvents => this.dateList.next(allEvents.map(event => event['date'])
            .filter((elem, pos, arr) => arr.indexOf(elem) === pos)));
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
