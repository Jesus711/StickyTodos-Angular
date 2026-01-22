import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarList } from './sidebar-list';

describe('SidebarList', () => {
  let component: SidebarList;
  let fixture: ComponentFixture<SidebarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
