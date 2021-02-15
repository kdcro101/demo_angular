import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TaskDialog, TodoComponent } from 'src/app/components/todo/todo.component';
import { ApiToDos, DataService } from 'src/app/services/data.service';

import { Question2Component } from './question2.component';
const todoData: ApiToDos = {
    "todos": [
        {
            "name": "Walk the dog",
            "status": "todo"
        },
        {
            "name": "Pay the bills",
            "status": "done"
        },
        {
            "name": "Buy groceries",
            "status": "todo"
        },
        {
            "name": "Build model plane",
            "status": "started"
        }
    ]
}
describe('Question2Component', () => {
    let component: Question2Component;
    let fixture: ComponentFixture<Question2Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatSnackBarModule,
                MatIconModule,
                MatMenuModule,
                MatDialogModule,
                MatFormFieldModule,
            ],
            declarations: [
                Question2Component,
                TodoComponent,
                TaskDialog,
                MatCard,
                MatList,
                MatInput,
                MatMenu,
                MatIcon,
                MatListItem,
                MatRipple,
            ], providers: [
                HttpHandler,
                HttpClient,
                DataService,
            ]
        })
            .compileComponents();
    });

    beforeEach((done) => {
        spyOn(DataService.prototype, "getTodos").and.returnValue(of(todoData))
        fixture = TestBed.createComponent(Question2Component);
        component = fixture.componentInstance;
        fixture.detectChanges()
        done()
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
