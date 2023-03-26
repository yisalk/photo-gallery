import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { GalleryComponent } from './gallery.component';
import { ImagesService } from '../services/images.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule], 
      declarations: [ GalleryComponent ],
      providers: [ ImagesService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display the photos', () => {
    const photos = [{ id: 1, download_url: 'https://picsum.photos/id/0/5000/3333'}, { id: 2, download_url: 'https://picsum.photos/id/2/5000/3333' },];
    component.visibleImages = photos;
    fixture.detectChanges();
    const photoElements = de.queryAll(By.css('.image-thumbnail'));
    expect(photoElements.length).toEqual(photos.length);
    photoElements.forEach((el, i) => {
      expect(el.nativeElement.src).toEqual(photos[i].download_url);
    });
  });

  it('should trigger addToFavorite when a photo is clicked', () => {
    const photos = [{ id: 1, download_url: 'https://picsum.photos/id/0/5000/3333' }, { id: 2, download_url: 'https://picsum.photos/id/2/5000/3333' },];
    component.visibleImages = photos;
    fixture.detectChanges();
    spyOn(component, 'addToFavorite');
    const photoElements = de.queryAll(By.css('.image-thumbnail'));
    photoElements[0].nativeElement.click();
    expect(component.addToFavorite).toHaveBeenCalledWith(photos[0]);
  });
});
