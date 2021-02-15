import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { DataService, ApiDevices } from 'src/app/services/data.service';

import { DevicesComponent } from './devices.component';

export const devicesData: ApiDevices = {
    "devices": [
        {
            "id": 1,
            "name": "iPhone 12",
            "type": "Mobile Phone",
            "price": "$699"
        }, {
            "id": 2,
            "name": "iPhone 12 Pro",
            "type": "Mobile Phone",
            "price": "$999"
        }, {
            "id": 3,
            "name": "Samsung Galaxy 20",
            "type": "Mobile Phone",
            "price": "$999"
        }
    ]
}


describe('DevicesComponent', () => {
    let component: DevicesComponent;
    let fixture: ComponentFixture<DevicesComponent>;
    let dataSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientModule,
                MatTableModule,
                MatFormFieldModule,
                MatPaginatorModule,
                MatSnackBarModule,
            ],
            declarations: [
                DevicesComponent,
                MatInput,
                MatIcon,
                MatCard,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        dataSpy = spyOn(DataService.prototype, "getDevices").and.returnValue(of(devicesData))
        fixture = TestBed.createComponent(DevicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    it('should have no filter on init', () => {
        expect(component).toBeTruthy();
        expect(component.dataSource.filter).toBeFalsy()
    });

    it('should pass data to table datasource', (done) => {
        const devices = devicesData.devices
        expect(component.dataSource.data).toEqual(devices)
        done()

    });
    it('should set filter on onFilterChange() call', (done) => {

        const filter = "Abc"
        component.onFilterChange(filter)

        expect(component.dataSource.filter).toEqual(filter.toLowerCase())

        done()

    });
    it('should reset filter on resetFilter() call', (done) => {
        const filter = "Abc"
        component.onFilterChange(filter)

        expect(component.dataSource.filter).toEqual(filter.toLowerCase())

        component.resetFilter()

        expect(component.dataSource.filter).toBe('')

        done()
    });
    it('should handle exemption when data is retreived ', (done) => {
        const snackSpy = spyOn(DevicesComponent.prototype, "openSnackBar")
        const getSpy = spyOn(DataService.prototype, "getData").and.returnValue(throwError(new Error("error")))

        dataSpy.and.callThrough()

        component.ngAfterViewInit()

        expect(snackSpy).toHaveBeenCalled()
        done()



    });
});
