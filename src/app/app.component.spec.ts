import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UIRouterModule } from '@uirouter/angular';
import { AppComponent } from './app.component';
import { DevicesComponent } from './components/devices/devices.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TodoComponent } from './components/todo/todo.component';
import { of } from "rxjs"

import { routes } from './app.module';
// import { DataService } from './services/data.service';
// imp  ort { HttpClient, HttpHandler } from '@angular/common/http';
// import { MatFormField, MatLabel } from '@angular/material/form-field';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatCard } from '@angular/material/card';
class MediaObserverMock {
    asObservable() {

        return of([{ mqAlias: "lg" }])
    }

}
// class TransitionMock {
//     params() {

//         return {
//             title: "mocktitle"
//         }
//     }

// }

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NoopAnimationsModule,
                UIRouterModule.forRoot({ states: routes, useHash: false }),
            ],
            declarations: [
                AppComponent,
                DevicesComponent,
                MoviesComponent,
                TodoComponent,
                MatDrawerContainer,
                MatDrawer,
                MatSelectionList,
                MatListOption,
                MatToolbar,
                MatToolbarRow,
                MatIcon,
                MatRipple,
                MatDrawerContent,
                
 
                
            ], providers: [
                { provide: MediaObserver, useClass: MediaObserverMock },
            ]
        }).compileComponents();



    });

    it('should create the component', () => {
        spyOn(AppComponent.prototype, 'setupLayout');

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges()
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have empty title`, () => {
        spyOn(AppComponent.prototype, 'setupLayout');
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges()
        const app = fixture.componentInstance;
        expect(app.title).toEqual('');
    });

    it('should call setupLayout', () => {
        spyOn(AppComponent.prototype, 'setupLayout');

        fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        // spyOn(app, 'setupLayout');
        fixture.detectChanges()

        expect(app.layout).toEqual("lg");
        expect(AppComponent.prototype.setupLayout).toHaveBeenCalledOnceWith("lg");
    });

    it('should configure layout=lg correctly', (done) => {

        spyOn(MatDrawer.prototype, 'open');
        spyOn(MatDrawer.prototype, 'toggle');




        fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;


        fixture.componentInstance.ngAfterViewInit();
        fixture.detectChanges(true)

        expect(MatDrawer.prototype.open).toHaveBeenCalled()
        expect(app.drawerIgnoreToggle).toBeTrue()


        app.toggleDrawer()
        expect(MatDrawer.prototype.toggle).not.toHaveBeenCalled()

        done()


    });
    it('should configure layout=sm correctly', (done) => {


        spyOn(MatDrawer.prototype, 'toggle');
        spyOn(MatDrawer.prototype, 'close');
        const media = spyOn(MediaObserverMock.prototype, 'asObservable').and.returnValue(of([{ mqAlias: "sm" }]))




        fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;


        fixture.componentInstance.ngAfterViewInit();
        fixture.detectChanges(true)

        expect(MatDrawer.prototype.close).toHaveBeenCalled()
        expect(app.drawerIgnoreToggle).toBeFalse()
        expect(app.layout).toEqual("sm");

        app.toggleDrawer()
        expect(MatDrawer.prototype.toggle).toHaveBeenCalled()

        done()


    });
    it('should configure layout=xs correctly', (done) => {

        spyOn(MatDrawer.prototype, 'close');
        spyOn(MatDrawer.prototype, 'toggle');
        const media = spyOn(MediaObserverMock.prototype, 'asObservable').and.returnValue(of([{ mqAlias: "xs" }]))




        fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;


        fixture.componentInstance.ngAfterViewInit();
        fixture.detectChanges(true)

        expect(MatDrawer.prototype.close).toHaveBeenCalled()
        expect(app.drawerIgnoreToggle).toBeFalse()
        expect(app.layout).toEqual("xs");

        app.toggleDrawer()
        expect(MatDrawer.prototype.toggle).toHaveBeenCalled()

        done()


    });
    it('should configure layout=md correctly', (done) => {


        spyOn(MatDrawer.prototype, 'open');
        spyOn(MatDrawer.prototype, 'toggle');
        const media = spyOn(MediaObserverMock.prototype, 'asObservable').and.returnValue(of([{ mqAlias: "md" }]))




        fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;


        fixture.componentInstance.ngAfterViewInit();
        fixture.detectChanges(true)

        expect(MatDrawer.prototype.open).toHaveBeenCalled()
        expect(app.drawerIgnoreToggle).toBeTrue()
        expect(app.layout).toEqual("md");

        app.toggleDrawer()
        expect(MatDrawer.prototype.toggle).not.toHaveBeenCalled()

        done()


    });
 
});
