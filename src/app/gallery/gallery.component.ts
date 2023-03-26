import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  title: any;
  visibleImages: any = [];
  favourite: any = [];
  data: any[] = [];
  isLoading: boolean = false;
  page: number = 0;

  constructor(
    private _imageService: ImagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/favourite') {
      this.title = "Favourite Photos";
      this.visibleImages = localStorage.getItem('favouriteImages')
      this.visibleImages = JSON.parse(this.visibleImages);
    } else {
      this.title = "Recent Photos";
      this.favourite = localStorage.getItem('favouriteImages')
      this.favourite = JSON.parse(this.favourite);
      this.getImages();
    }
  }

  onScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !this.isLoading) {
      this.getImages();
    }
  }

  getImages() {
    this.isLoading = true;
    this.page = this.page + 1;
    let data = {
      page: this.page,
      limit: 10 
    }
    this._imageService.getImages(data).subscribe(
      res => {
        this.visibleImages.push.apply(this.visibleImages, res)
        this.isLoading = false;
      },
      err => {
        console.log('err', err)
      }
    )
  }

  addToFavorite(url: { download_url: any; id: any; }) {
    if (this.router.url != '/favourite') {
      if (!this.elementExists(url.download_url)) {
        this.favourite.push(url);
      }
      localStorage.setItem('favouriteImages', JSON.stringify(this.favourite))
    }
    this.router.navigate(['/photos', url.id]);
  }

  elementExists(downloadUrl: string) {
    return this.favourite.some(function (el: any) {
      return el.download_url === downloadUrl;
    });
}

}
