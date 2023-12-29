import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
    title = '';
    mediaWatcher!: Subscription;
    activeMediaQuery = '';
    layout = "xs"

    drawerMode: MatDrawerMode = "over"
    drawerIgnoreToggle: boolean = false

    constructor(private titleService: Title, private mediaObserver: MediaObserver) {
        // this.transition.onSuccess({}, this.setTitle)

    }

    ngAfterViewInit() {
        this.mediaWatcher = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {

            const last = change[0]
            this.layout = last.mqAlias
            this.setupLayout(this.layout)
        });

    }
    ngOnDestroy() {
        this.mediaWatcher.unsubscribe();
    }
    toggleDrawer() {
        if (!this.drawerIgnoreToggle) {
            this.drawer.toggle()
        }
    }
    setupLayout(media: string) {

        if (media == "xs" || media == "sm") {
            this.drawerMode = "over"
            this.drawerIgnoreToggle = false
            this.drawer.close()
        }
        else {
            this.drawerMode = "side"
            this.drawerIgnoreToggle = true
            this.drawer.open()
        }

    }
}
