import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { EventsService } from './events.service';
import { Events, AppState } from '../app.state';
import { MODIFY } from './events.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.styl']
})
export class EventsComponent {

    model: Observable<Events>;

    constructor(private store: Store<AppState>, private eventsService: EventsService, private route: ActivatedRoute) {
        this.model = store.select('events');

        this.route.params.subscribe(params => {
            if (params.city) { store.dispatch({ type: MODIFY, model: { ['cityFilter']: params.city } }); }
        });
    }

    modify(field, value) {
        this.store.dispatch({ type: MODIFY, model: { [field]: value } });
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
