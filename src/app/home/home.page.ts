import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { ActionSheetController, AlertController } from "@ionic/angular";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts: any;
  fileSaving: string;
  photoUrl = "https://pbs.twimg.com/media/DqKGaVKUUAEoOtd.jpg";
  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
  ) { }

  tilte: string = '自己紹介';
  changeDetail: string;
  introSub: string;
  introCont: string;/*detailの方*/
  introSubjects: { name: string, detail: string }[] = [//紹介する題材
    { name: '名前', detail: '' },
    { name: '誕生日', detail: '' },
    { name: '血液型', detail: '' },
    { name: '学科', detail: '' },
    { name: '出身地', detail: '' },
    { name: '趣味', detail: '' },
  ];



  async changeSubject(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: '内容の変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.introSubjects.splice(index, 1);
            localStorage.introSubjects = JSON.stringify(this.introSubjects);
          }
        }, {
          text: '変更',
          icon: 'create',
          handler: () => {
            this._renameSubject(index);
          }
        }, {
          text: '閉じる',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    actionSheet.present();
  }

  async _renameSubject(index: number) {
    const prompt = await this.alertController.create({
      header: '内容を変更する',
      inputs: [
        {
          name: 'content',
          placeholder: '内容',
          value: this.introSubjects[index].name
        },
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            if (data.content.length === 0) {
              this.rejectSub();
            } else {
              this.introSubjects[index] = { name: data.content, detail: '' };
              localStorage.introSubjects = JSON.stringify(this.introSubjects);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  async rejectSub() {
    const prompt = await this.alertController.create({
      header: '文字を入力してください',

      buttons: [
        {
          text: '閉じる',
         /* handler: () => {
            this.introSubjects.splice(this.introSubjects.length - 1, 1);
            localStorage.introSubjects = JSON.stringify(this.introSubjects);
          }*/
        },
      ]
    });
    prompt.present();
  }

  async addSubject() {
    const prompt = await this.alertController.create({
      header: '話題を追加',
      inputs: [
        {
          name: 'content',
          placeholder: '星座、部活、etc...',
          value: this.introSub
        },
      ],

      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            if (data.content.length === 0) {
              this.rejectSub();
            } else {
              this.introSubjects.push({
                name: data.content,
                detail: ''
              }

              )
            };
            localStorage.introSubjects = JSON.stringify(this.introSubjects);

          }
        }
      ]

    });
    prompt.present();
  }




  async addCont(index: number) {
    const prompt = await this.alertController.create({
      header: '内容を変更',
      inputs: [
        {
          name: 'content',
          placeholder: '内容',
          value: this.introSubjects[index].detail
        },
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            this.introSubjects[index].detail = data.content;
            localStorage.introSubjects = JSON.stringify(this.introSubjects);
          }
        }
      ]
    });
    prompt.present();
  }

  changeCont(index: number) {
    this.introSubjects[index].detail = this.introCont;
    localStorage.introSubjects = JSON.stringify(this.introSubjects);
    this.introCont = '';
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalUploadComponent, // さっき作ったComponentを指定
      componentProps: { value: 123 }
    });
    modal.present();
    const { data } = await modal.onWillDismiss()
    if (typeof data.content !== `string`) {
      console.log("CALLED?");
      throw new Error(`content should be string`)
    }
    localStorage.setItem(`photoUrl`, data.content);
    this.loadPhoto()
  }

  ionViewWillEnter() {
    this.loadPhoto()
    if ('introSubjects' in localStorage) {
      this.introSubjects = JSON.parse(localStorage.introSubjects);
    }
  }

  private loadPhoto() {

    const existsPhoto = localStorage.getItem(`photoUrl`) !== null && localStorage.getItem(`photoUrl`).length >= 1

    if (existsPhoto) {
      this.photoUrl = localStorage.getItem(`photoUrl`);
    }
  }
}



