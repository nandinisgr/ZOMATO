import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  sub: any
  city_data: any
  obj: any;
  response: any;
  cordanates: any;
  formgroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
  })
  subject: Subject<any> = new Subject();
  establishment_data: any = [];
  cuisins_data: any;
  selected__cuisins: any
  selected_estb: any

  constructor(public activatedRoute: ActivatedRoute, public router: Router, public server: ApiServicesService) {

  }

  ngOnInit(): void {
    this.sub = combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
    this.sub.pipe(
      debounceTime(0),
      map((results: any) => ({ params: results[1] }))
    ).subscribe((data: any) => {
      this.city_data = data.params
      this.obj = {
        city: this.city_data.name,
        key: 'Ajw-ihurpucGbghSvIszgKaGSdlY3PvLOLcSNmWHT2FfIJ0WIvn9mPEnITUv7223'
      }
      this.server.get_geoCodes(this.obj).subscribe(res => {
        this.response = res
        this.cordanates = this.response.resourceSets[0].resources[0].point.coordinates
        console.log("resss==", this.city_data, this.response)
        let est_input = {
          cityid: this.city_data.id,
          geoCodes: this.cordanates
        }
        this.server.get_establishment_types(est_input).subscribe(res1 => {
          console.log("estab==", res1)
          this.response = res1
          this.establishment_data = this.response.establishments
        })
        this.server.get_cuisins(est_input).subscribe(res2 => {
          console.log("cusi==", res2)
          this.response = res2
          this.cuisins_data = this.response.cuisines
        })

      })

    })
    this.selected_estb = null
    this.selected__cuisins = null

  }
  Selected_data(value: any, name: any) {
    if (name == 'establishments') {
      this.selected_estb = value.establishment.id
    }
    else {
      this.selected__cuisins = value.cuisine.cuisine_id
    }
    if (this.selected__cuisins && this.selected_estb) {
      let rest_obj = { cordanates: this.cordanates, estb_id: this.selected_estb, cuisin_id: this.selected__cuisins }
      this.router.navigate(['/restaurents'], {
        relativeTo: this.activatedRoute,
        queryParams: rest_obj,
        replaceUrl: false,
        queryParamsHandling: 'merge'
      });
    }
  }
}
