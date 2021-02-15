import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ApiMovies, DataService } from 'src/app/services/data.service';

import { MoviesComponent } from './movies.component';
import { TreeNode } from "./movies.component"
const moviesData: ApiMovies = {
    categories: [{
        "id": 1,
        "name": "one"
    },
    {
        "id": 2,
        "name": "two"
    },
    {
        "id": 3,
        "name": "three"
    }],
    movies: [
        {
            "id": 1,
            "name": "b",
            "categories": [
                1
            ]
        },
        {
            "id": 1,
            "name": "a",
            "categories": [
                1
            ]
        },
        {
            "id": 2,
            "name": "d",
            "categories": [
                2
            ]
        },
        {
            "id": 2,
            "name": "c",
            "categories": [
                2
            ]
        },
        {
            "id": 3,
            "name": "e",
            "categories": [
                3
            ]
        },
        {
            "id": 3,
            "name": "f",
            "categories": [
                3
            ]
        },
    ]
}


describe('MoviesComponent', () => {
    let component: MoviesComponent;
    let fixture: ComponentFixture<MoviesComponent>;
    let dataSpy: jasmine.Spy;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatTreeModule,
                MatIconModule,
                MatSnackBarModule,
            ],
            declarations: [
                MoviesComponent,
                MatCard,
            ],
            providers: [
                
                HttpHandler,
                HttpClient,
                DataService,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        dataSpy = spyOn(DataService.prototype, "getMovies").and.returnValue(of(moviesData))
        fixture = TestBed.createComponent(MoviesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    it('should build and assign tree data', () => {

        const categories = moviesData.categories;
        const movies = moviesData.movies
        const compData = component.treeData;

        let treeData: TreeNode[] = []

        for (let i = 0; i < categories.length; i++) {
            const p = categories[i]
            const children = movies.filter((item) => {
                const categories = new Set(item.categories);
                return categories.has(p.id)
            })
            let node = p as TreeNode

            treeData.push(node)

            node.children = children.sort((a, b) => (a.name < b.name) ? -1 : 1) as TreeNode[]
            expect(compData[i].children).not.toBeUndefined()
            expect(node.children.length).toEqual(compData[i].children!.length)
            const compOrder = compData[i].children!.reduce((p, c, _) => p + c, "")
            const expectedOrder = node.children.reduce((p, c, _) => p + c, "")
            expect(compOrder).toEqual(expectedOrder)

        }

        expect(component.dataSource.data).toEqual(treeData)
    });
    it('should handle exemption when data is retreived ', (done) => {
        const snackSpy = spyOn(MoviesComponent.prototype, "openSnackBar")
        const getSpy = spyOn(DataService.prototype, "getData").and.returnValue(throwError(new Error("error")))

        dataSpy.and.callThrough()

        component.ngAfterViewInit()

        expect(snackSpy).toHaveBeenCalled()
        done()



    });
});
