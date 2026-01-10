import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';


@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatNavList,
    MatSidenavContainer,
    MatSidenavModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {


}
