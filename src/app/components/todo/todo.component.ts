import { AfterContentInit, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService, ToDo, TodoStatus, ApiToDos } from 'src/app/services/data.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements AfterContentInit {

    todos: ToDo[] = []

    constructor(private data: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    }

    ngAfterContentInit() {
        this.data.getTodos().subscribe((response: ApiToDos) => {
            this.todos = response.todos != null ? response.todos : [];
        }, (_) => {
            this.openSnackBar("Error getting the data")
        })
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(TaskDialog, {
            width: '300px',
            data: { create: true, name: "" }
        });

        dialogRef.afterClosed().subscribe(result => {

            this.appendTask(result);
        });
    }

    openRenameDialog(name: string): void {
        const dialogRef = this.dialog.open(TaskDialog, {
            width: '300px',
            data: { create: false, name: name }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.updateName(name, result)
        });
    }
    updateStatus(name: string, status: TodoStatus) {
        const itemIndex = this.todos.findIndex((item) => item.name == name)

        if (itemIndex == -1) {
            return
        }

        this.todos[itemIndex].status = status;

    }
    updateName(oldName: string, newName: string) {
        const itemIndex = this.todos.findIndex((item) => item.name == oldName)

        if (itemIndex == -1 || newName == null) {
            return
        }

        const duplicate = this.isDuplicate(newName)

        if (duplicate) {
            this.openSnackBar("Duplicate task");
            return;
        }

        this.todos[itemIndex].name = newName;

    }
    appendTask(taskname: string) {

        if (!taskname || taskname.trim() == "") {
            return;
        }

        // check for duplicates
        const duplicate = this.isDuplicate(taskname)
        if (duplicate) {
            this.openSnackBar("Duplicate task");
            return;
        }

        const newItem: ToDo = {
            name: taskname.trim(),
            status: "todo"
        }

        this.todos.push(newItem)


    }
    openSnackBar(message: string) {
        this.snackBar.open(message, "OK", {
            duration: 2000,
        });
    }
    isDuplicate(name: string): boolean {
        const check = this.todos.findIndex((item) => {
            return item.name.toLowerCase() == name.trim().toLowerCase()
        })

        return check === -1 ? false : true;
    }
    deleteTask(name: string) {
        this.todos = this.todos.filter((item) => item.name != name)
    }
}

export interface DialogData {
    create: boolean;
    name: string;
}

@Component({
    selector: 'task-dialog',
    templateUrl: './task-dialog.html',
})
export class TaskDialog {
    name!: string
    constructor(
        public dialogRef: MatDialogRef<TaskDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}