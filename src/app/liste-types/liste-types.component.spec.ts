import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesComponent } from './liste-types.component';

describe('ListeTypesComponent', () => {
  let component: ListeTypesComponent;
  let fixture: ComponentFixture<ListeTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTypesComponent]
    });
    fixture = TestBed.createComponent(ListeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
