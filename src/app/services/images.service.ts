import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getImages(data: any) {
    return this.httpClient.get(`https://picsum.photos/v2/list?page=${data.page}&limit=${data.limit}`);
  }
}
