import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // formgroup: FormGroup;
  formgroup = new FormGroup({
    name: new FormControl('',Validators.compose([Validators.required])),
  })
  subject: Subject<any> = new Subject();
  response: any;
  cities: any = [];
  sub: any
  selected = {}

  constructor(public router: Router, private formBuilder: FormBuilder, public server: ApiServicesService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.formgroup = this.formBuilder.group({
    //   name: ['']
    // }); 
    this.sub = combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (this.formgroup.value.name) {
          this.server.sendReq(this.formgroup.value.name).subscribe(data => {
            console.log("cities", data)
            this.response = data
            if (this.response.status == "success") {
              this.cities = this.response.location_suggestions
            }
            else {
              this.cities = []
            }
          })


        }

      })
      console.log("selected",this.selected)
  }
  onKeyUp() {
    this.subject.next();
  }
  mouse_enter() {
    this.subject.next();
  }
  procced() {
    if (this.formgroup.valid) {
        this.router.navigate(['/cities'], {
          relativeTo: this.activatedRoute,
          queryParams: this.selected,
          replaceUrl: false,
          queryParamsHandling: 'merge'
        });
      
    }
  }

}


