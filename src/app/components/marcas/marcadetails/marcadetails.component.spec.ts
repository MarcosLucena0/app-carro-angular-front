import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcadetailsComponent } from './marcadetails.component';

describe('MarcadetailsComponent', () => {
  let component: MarcadetailsComponent;
  let fixture: ComponentFixture<MarcadetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcadetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
