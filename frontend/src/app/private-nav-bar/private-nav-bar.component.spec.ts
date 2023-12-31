import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNavBarComponent } from './private-nav-bar.component';

describe('PrivateNavBarComponent', () => {
  let component: PrivateNavBarComponent;
  let fixture: ComponentFixture<PrivateNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
