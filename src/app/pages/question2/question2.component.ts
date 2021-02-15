import { Component, HostBinding, OnInit } from '@angular/core';
import { animation } from "../../const/animations"

@Component({
  selector: 'app-question2',
  templateUrl: './question2.component.html',
  styleUrls: ['./question2.component.scss'],
  animations: [
    animation
  ],
  host: {'class': 'page-component'}
})
export class Question2Component implements OnInit {
  @HostBinding('@anim') anim: string = "in"
  constructor() { }

  ngOnInit(): void {
  }

}
