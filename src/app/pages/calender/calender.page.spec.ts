import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalenderPage } from './calender.page';

describe('CalenderPage', () => {
  let component: CalenderPage;
  let fixture: ComponentFixture<CalenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
