import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ModalUploadComponent } from "./modal-upload.component";

describe("ModalUploadComponent", () => {
  let component: ModalUploadComponent;
  let fixture: ComponentFixture<ModalUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUploadComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
