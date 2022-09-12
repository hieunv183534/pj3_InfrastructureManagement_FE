import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  overview: any;

  constructor() {
    this.overview = JSON.parse( localStorage.getItem('overview') || "[]" );
    console.log(this.overview);
  }

  ngOnInit() {
  }

}
