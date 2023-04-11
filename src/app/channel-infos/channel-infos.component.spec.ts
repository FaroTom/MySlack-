import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelInfosComponent } from './channel-infos.component';

describe('ChannelInfosComponent', () => {
  let component: ChannelInfosComponent;
  let fixture: ComponentFixture<ChannelInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
