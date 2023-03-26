import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  
  image: any;
  favourite: any = [];
  id: any;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.image = `https://picsum.photos/id/${this.id}/2500/1667`;
    });
  }

  removeFavorite() {
    this.favourite = localStorage.getItem('favouriteImages');
    this.favourite = JSON.parse(this.favourite);
    this.favourite.map((ele: any, index: any) => {
      if(ele.id == this.id) {
        this.favourite.splice(index, 1);
        localStorage.setItem('favouriteImages', JSON.stringify(this.favourite))
        this.router.navigate(['/'])
      }
    })
  }
}
