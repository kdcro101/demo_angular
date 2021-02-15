import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ApiToDos, DataService } from 'src/app/services/data.service';

import { TaskDialog, TodoComponent } from './todo.component';

class DialogRefMock {
    afterClosed() {
        return of("mock")
    }
}

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

describe('TodoComponent', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;
    let dataSpy: jasmine.Spy;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatSnackBarModule,
                MatIconModule,
                MatMenuModule,
                MatDialogModule,
                MatFormFieldModule,
                MatCardModule,

            ],
            declarations: [
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

    beforeEach(() => {
        dataSpy = spyOn(DataService.prototype, "getTodos").and.returnValue(of(todoData))
        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.componentInstance;
        component.ngAfterContentInit()
        fixture.detectChanges();
    });

    it('sshould create the component', () => {
        expect(component).toBeTruthy();
    });
    it('should store \'to do\' items', () => {
        expect(component.todos).toEqual(todoData.todos);
    });
    it('should update status of \'to do\' item', () => {

        component.updateStatus(component.todos[0].name, "done")

        expect(component.todos[0].status).toEqual("done");
    });
    it('should delete \'to do\' item', () => {
        const lenBefore = component.todos.length
        const name = component.todos[0].name
        component.deleteTask(name)

        const findIndex = component.todos.findIndex((item) => item.name === name)

        expect(component.todos.length).toEqual(lenBefore - 1);
        expect(findIndex).toEqual(-1);
    });

    it('should prevent appending of duplicates', () => {
        const snackSpy = spyOn(TodoComponent.prototype, "openSnackBar")
        const lenBefore = component.todos.length

        const name = component.todos[0].name
        component.appendTask(name)

        expect(component.todos.length).toEqual(lenBefore);
        expect(snackSpy).toHaveBeenCalledOnceWith("Duplicate task")
    });
    it('should update name of \'to do\' item', () => {
     
        const name = component.todos[0].name
        const newName = name + Math.random().toString()
        component.updateName(name, newName)

        const findOld = component.todos.findIndex((item) => item.name === name)
        const findNew = component.todos.findIndex((item) => item.name === newName)

        expect(findOld).toEqual(-1);
        expect(findNew).toBeGreaterThanOrEqual(0)

    });
    it('should properly check for duplicate of the \'to do\' item', () => {
        const name = component.todos[0].name
        const isDup1 = component.isDuplicate(name)

        expect(isDup1).toBeTrue()
        const isDup2 = component.isDuplicate(name + Math.random().toString())
        expect(isDup2).toBeFalse()

    });
    it('should call this.dialog.open when creating a \'to do\' item', () => {
        const dialogSpy = spyOn(MatDialog.prototype, "open").and.returnValue(new DialogRefMock() as any)
        component.openCreateDialog()

        expect(dialogSpy).toHaveBeenCalledOnceWith(TaskDialog, {
            width: '300px',
            data: { create: true, name: "" }
        })

    })
    it('should call this.dialog.open when editing a \'to do\' item', () => {
        const dialogSpy = spyOn(MatDialog.prototype, "open").and.returnValue(new DialogRefMock() as any)
        const name = component.todos[0].name
        component.openRenameDialog(name)

        expect(dialogSpy).toHaveBeenCalledOnceWith(TaskDialog, {
            width: '300px',
            data: { create: false, name: name }
        })

    });
    it('should handle exemption when data is retreived ', (done) => {
        const snackSpy = spyOn(TodoComponent.prototype, "openSnackBar")
        const getSpy = spyOn(DataService.prototype, "getData").and.returnValue(throwError(new Error("error")))

        dataSpy.and.callThrough()

        component.ngAfterContentInit()

        expect(snackSpy).toHaveBeenCalled()
        done()



    });
});
