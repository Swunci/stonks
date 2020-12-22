import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links = ['Stocks', 'Portfolio'];
  activeLink = this.links[0];
  background: ThemePalette = 'primary';
}
