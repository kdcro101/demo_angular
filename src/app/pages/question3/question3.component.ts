import { Component, HostBinding, OnInit } from '@angular/core';
import { animation } from 'src/app/const/animations';

@Component({
  selector: 'app-question3',
  templateUrl: './question3.component.html',
  styleUrls: ['./question3.component.scss'],
  animations: [
    animation
  ],
  host: { 'class': 'page-component' }
})
export class Question3Component implements OnInit {
  @HostBinding('@anim') anim: string = "in"
  constructor() { }

  ngOnInit(): void {
  }

}
