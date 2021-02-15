import { animation } from "../../const/animations"
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-question1',
    templateUrl: './question1.component.html',
    styleUrls: ['./question1.component.scss'],
    animations: [
        animation
    ],
    host: { 'class': 'page-component' }
})
export class Question1Component implements OnInit {
    private state: 'opened' | 'closed' = 'closed';

    @HostBinding('@anim') anim: string = "in"
    constructor() { }

    ngOnInit(): void {
    }

}
