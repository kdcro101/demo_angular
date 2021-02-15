import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, zip } from 'rxjs';

import { ApiToDos, DataService } from './data.service';

describe('DataService', () => {
    let service: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ],
            declarations: [
            ],
        });
        service = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should call getData with valid url when getting devices.json', () => {
        const getData = spyOn<any>(DataService.prototype, "getData").and.returnValue(of(true))
        service.getDevices().subscribe(() => {
            expect((DataService.prototype as any).getData).toHaveBeenCalledOnceWith("/assets/devices.json")
        })
    });
    it('should call getData with valid url when getting movies-data.json', () => {
        const getData = spyOn<any>(DataService.prototype, "getData").and.returnValue(of(true))
        service.getMovies().subscribe(() => {
            expect((DataService.prototype as any).getData).toHaveBeenCalledOnceWith("/assets/movies-data.json")
        })
    });
    it('should call getData with valid url when getting todo.json', () => {
        const getData = spyOn<any>(DataService.prototype, "getData").and.returnValue(of(true))
        service.getTodos().subscribe(() => {
            expect((DataService.prototype as any).getData).toHaveBeenCalledOnceWith("/assets/todo.json")
        })
    });
    it('should call HttpClient.get when getting data', () => {
        const getData = spyOn(HttpClient.prototype, "get").and.returnValue(of(true))
        
        zip([service.getTodos(),service.getDevices(),service.getMovies()])
        .subscribe((val)=>{
              
            expect(getData).toHaveBeenCalledTimes(3)
            expect(val).toEqual([true,true,true] as any[])
            expect(service.cacheTodos).toEqual(true as any)
        })

    });
    it('should cache \'To do\' data after first call', () => {
        const fakeData: ApiToDos = {
            todos:[]
        }
        const getData = spyOn(HttpClient.prototype, "get").and.returnValue(of(fakeData))
        
        service.getTodos() 
        .subscribe((val)=>{
              
            expect(getData).toHaveBeenCalledTimes(1)
            expect(val).toEqual(fakeData)
            expect(service.cacheTodos).toEqual(fakeData)
        })

    });
});
