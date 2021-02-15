import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Question1Component } from './pages/question1/question1.component';
import { Question2Component } from './pages/question2/question2.component';
import { Question3Component } from './pages/question3/question3.component';
import { DevicesComponent } from './components/devices/devices.component';
import { TaskDialog, TodoComponent } from './components/todo/todo.component';
import { MoviesComponent } from './components/movies/movies.component';
import { UIRouterModule } from '@uirouter/angular';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export const routes = [

    { name: "question-1", url: '/question-1', component: Question1Component, params: { title: "Devices" } },
    { name: "question-2", url: '/question-2', component: Question2Component, params: { title: "To do" } },
    { name: "question-3", url: '/question-3', component: Question3Component, params: { title: "Movies" } },
];


@NgModule({
    declarations: [
        AppComponent,
        Question1Component,
        Question2Component,
        Question3Component,
        DevicesComponent,
        TodoComponent,
        MoviesComponent,
        TaskDialog
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        UIRouterModule.forRoot({ states: routes, useHash: false, otherwise: { state: "question-1" } }),
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTreeModule,

    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [TaskDialog],

})
export class AppModule { }
