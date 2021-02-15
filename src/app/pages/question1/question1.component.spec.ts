import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DevicesComponent } from 'src/app/components/devices/devices.component';
import { ApiDevices, DataService } from 'src/app/services/data.service';

import { Question1Component } from './question1.component';
export const devicesData:ApiDevices = {
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
    ]} 

describe('Question1Component', () => {
    let component: Question1Component;
    let fixture: ComponentFixture<Question1Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                NoopAnimationsModule,
                MatSnackBarModule,
                MatTableModule,
                MatFormFieldModule,
                MatPaginatorModule,
            ],
            declarations: [
                Question1Component,
                DevicesComponent,
                MatInput,
                MatIcon,
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
        spyOn(DataService.prototype,"getDevices").and.returnValue(of(devicesData))
        fixture = TestBed.createComponent(Question1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
