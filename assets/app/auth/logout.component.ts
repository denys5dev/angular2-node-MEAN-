import { Component } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from './auth.service';

@Component({
    selector: 'app-logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
    `
})

export class LogoutComponent {

    constructor(private authServise: AuthService, private router: Router) {

    }
    
    onLogout() {
        this.authServise.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}