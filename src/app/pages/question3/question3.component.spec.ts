import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MoviesComponent } from 'src/app/components/movies/movies.component';
import { ApiMovies, DataService } from 'src/app/services/data.service';

import { Question3Component } from './question3.component';
const moviesData:ApiMovies = {
    categories:[],
    movies:[]
}
describe('Question3Component', () => {
    let component: Question3Component;
    let fixture: ComponentFixture<Question3Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatTreeModule,
                MatSnackBarModule,
            ],
            declarations: [
                Question3Component,
                MoviesComponent,
                MatCard,
            ],providers:[
                HttpHandler,
                HttpClient,
                DataService,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        spyOn(DataService.prototype,"getMovies").and.returnValue(of(moviesData))
        fixture = TestBed.createComponent(Question3Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
