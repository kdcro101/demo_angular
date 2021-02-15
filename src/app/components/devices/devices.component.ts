import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiDevices, DataService, Device } from 'src/app/services/data.service';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements   AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['id', 'name', 'price', 'type'];
    dataSource = new MatTableDataSource<Device>([]);

    constructor(private data: DataService, private snackBar: MatSnackBar) { }
 
    ngAfterViewInit() {

        this.data.getDevices().subscribe((response: ApiDevices) => {
            const devices = response.devices.map((data) => {
                data.price = data.price.replace("$", "")
                return data
            })
            this.dataSource = new MatTableDataSource<Device>(devices as Device[]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate =
                (data: Device, filter: string) => data.name.toLowerCase().indexOf(filter) != -1;
        }, (_) => {
            this.openSnackBar("Error getting the data")
        })

    }
    openSnackBar(message: string) {
        this.snackBar.open(message, "OK", {
            duration: 2000,
        });
    }
    onFilterChange(text: string) {

        let filterValue = text.trim().toLowerCase(); // Remove whitespace
        this.dataSource.filter = filterValue;

    }
    resetFilter() {
        this.dataSource.filter = '';
    }
}
