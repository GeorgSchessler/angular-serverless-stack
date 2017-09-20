import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl']
})
export class HomeComponent {

    public slideIndex = 0;
    public subscription: Subscription;

    constructor() {
        this.subscription = Observable.interval(6000).subscribe(() => {
            this.slideIndex = this.slideIndex >= 2 ? 0 : ++this.slideIndex;
        });
    }

    showSliderItem(index) {
        this.subscription.unsubscribe();
        this.slideIndex = index;
    }
}
