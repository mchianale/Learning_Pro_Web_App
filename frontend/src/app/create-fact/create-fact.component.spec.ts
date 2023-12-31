import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFactComponent } from './create-fact.component';

describe('CreateFactComponent', () => {
  let component: CreateFactComponent;
  let fixture: ComponentFixture<CreateFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
