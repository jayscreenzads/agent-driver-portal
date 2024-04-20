import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResubmitImageComponent } from './resubmit-image.component';

describe('ResubmitImageComponent', () => {
  let component: ResubmitImageComponent;
  let fixture: ComponentFixture<ResubmitImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResubmitImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResubmitImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
