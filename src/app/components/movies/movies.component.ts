import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ApiMovies, DataService } from 'src/app/services/data.service';

export interface TreeNode {
    name: string;
    children?: TreeNode[];
}

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, AfterViewInit {
    treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeNode>();

    treeData: TreeNode[] = []
    constructor(private data: DataService, private snackBar: MatSnackBar) {

    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.data.getMovies().subscribe((response: ApiMovies) => {
            this.treeData = this.buildTree(response);
            this.dataSource.data = this.treeData
        }, (error) => {
            this.openSnackBar("Error getting the data")
        });
    }
    openSnackBar(message: string) {
        this.snackBar.open(message, "OK", {
            duration: 2000,
        });
    }
    buildTree(data: ApiMovies): TreeNode[] {

        let list: TreeNode[] = []

        for (let i of data.categories) {

            const items = data.movies.filter((item) => {
                const categories = new Set(item.categories);
                return categories.has(i.id)
            })

            let node = i as TreeNode
            node.children = items.sort((a, b) => (a.name < b.name) ? -1 : 1) as TreeNode[]
            list.push(node)
        }

        return list

    }

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;


}
