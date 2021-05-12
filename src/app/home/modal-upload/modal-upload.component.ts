import { Component, OnInit } from '@angular/core'; // Inputを追加
import { ModalController } from '@ionic/angular'; // 追加


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.scss'],
})
export class ModalUploadComponent implements OnInit {

  constructor(public modalCtl: ModalController) { }

  ngOnInit() {}
  fileSave:string;
  handleSubmit($event) {
    console.log($event);
    $event.preventDefault();
    const file = $event.target.elements.photo.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      console.log(reader);
      reader.addEventListener('load', (event) => {
        const content = event.target.result;
        this.modalCtl.dismiss({
          content,
        })
      });
      reader.readAsDataURL(file);
      this.fileSave = file;
    }
  }

  dismissModal($event) {
    console.log("dismissed");
    this.modalCtl.dismiss({
      'dismissed': true
    });
  }
}
