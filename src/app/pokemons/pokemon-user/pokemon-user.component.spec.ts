import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonUserComponent } from './pokemon-user.component';

describe('PokemonUserComponent', () => {
  let component: PokemonUserComponent;
  let fixture: ComponentFixture<PokemonUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
