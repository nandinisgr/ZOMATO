import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http: HttpClient, private router: Router,) { }

  sendReq(data: any) {
    const headers = new HttpHeaders()
      .set('user-key', 'ebce07efec80d0017e1a3ee7173cdbd6')
    const url = `https://developers.zomato.com/api/v2.1/cities?q=${data}`;

    return this.http.get(url, { headers: headers })
  }
  get_geoCodes(data: any) {
    // console.log("hghghg",data)

    const url = `http://dev.virtualearth.net/REST/v1/Locations?q=${data.city}&key=${data.key}`;
    return this.http.get(url)
  }
  get_establishment_types(data: any) {
    const headers = new HttpHeaders()
      .set('user-key', 'ebce07efec80d0017e1a3ee7173cdbd6')
    const url = `https://developers.zomato.com/api/v2.1/establishments?city_id=${data.cityid}&lat=${data.geoCodes[0]}&lon=${data.geoCodes[1]}`;

    return this.http.get(url, { headers: headers })

  }
  get_cuisins(data: any) {
    const headers = new HttpHeaders()
      .set('user-key', 'ebce07efec80d0017e1a3ee7173cdbd6')
    const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${data.cityid}&lat=${data.geoCodes[0]}&lon=${data.geoCodes[1]}`;

    return this.http.get(url, { headers: headers })
  }

  get_restaurant(data: any) {
    const headers = new HttpHeaders()
      .set('user-key', 'ebce07efec80d0017e1a3ee7173cdbd6')
    const url = `https://developers.zomato.com/api/v2.1/search?city_id=${data.cityid}&lat=${data.geoCodes[0]}&lon=${data.geoCodes[1]}&establishment_id=${data.establishmentid}&cuisines=${data.cuisineid}&radius=500&sort=real_distance&order=asc&start=0&count=20`;

    return this.http.get(url, { headers: headers })
  }

}
