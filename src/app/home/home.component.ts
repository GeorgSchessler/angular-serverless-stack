import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl']
})
export class HomeComponent {

    public slideIndex = 0;

    constructor() {
        const source = Observable.interval(6000);
        const subscribe = source.subscribe(() => {
            this.slideIndex = this.slideIndex >= 2 ? 0 : ++this.slideIndex;
        });
    }
}
