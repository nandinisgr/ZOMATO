import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-restaurents',
  templateUrl: './restaurents.component.html',
  styleUrls: ['./restaurents.component.scss']
})
export class RestaurentsComponent implements OnInit {
  sub: any
  city_data: any
  obj: any;
  response: any;
  cordanates: any;
  subject: Subject<any> = new Subject();
  establishment_data: any = [];
  cuisins_data: any;
  retuarant_data: any;
  cuisine_data: any;
  establish_data: any;
  constructor(public activatedRoute: ActivatedRoute, public router: Router, public server: ApiServicesService) { }
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
      this.cuisine_data = data.params
      this.obj = {
        cuisine: this.cuisine_data.name,
        key: 'Ajw-ihurpucGbghSvIszgKaGSdlY3PvLOLcSNmWHT2FfIJ0WIvn9mPEnITUv7223'
      }
      this.establish_data = data.params
      this.obj = {
        establish: this.establish_data.name,
        key: 'Ajw-ihurpucGbghSvIszgKaGSdlY3PvLOLcSNmWHT2FfIJ0WIvn9mPEnITUv7223'
      }
      this.server.get_geoCodes(this.obj).subscribe(res => {
        this.response = res
        this.cordanates = this.response.resourceSets[0].resources[0].point.coordinates
        console.log("resss==", this.city_data, this.response)
        let est_input = {
          cityid: this.city_data.id,
          geoCodes: this.cordanates,
          cuisineid: this.cuisine_data.cuisine_id,
          establishmentid: this.establish_data.id
        }
        this.server.get_restaurant(est_input).subscribe(res3 => {
          this.response = res3
          this.retuarant_data = this.response.restaurants
          console.log("retuarant_data==", this.retuarant_data)
        })
      })

    })
  }

}
