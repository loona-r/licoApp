import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  Platform
} from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { Contacts } from "@ionic-native/contacts";
import { SettingsPage } from "../settings/settings";
import { CallNumber } from "@ionic-native/call-number";
import { AngularFireDatabase } from "angularfire2/database";
import { DataProvider } from "../../providers/data/data";

@Component({
  selector: "page-prank-phone",
  templateUrl: "prank-phone.html"
})
export class PrankPhonePage {
  playerList: Array<{ id: number; name: string }>;
  joueur: string;
  chosenContact: any;
  indexJoueur: number;
  wordList: any;
  chosenWord: string;
  wordListLength;

  constructor(
    public platform: Platform,
    public alertCtrl: AlertController,
    private callNumber: CallNumber,
    public db: AngularFireDatabase,
    private contacts: Contacts,
    private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider
  ) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => this.backPage());
    });
    this.playerList = navParams.get("param1");
    this.joueur = this.playerList[0].name;
    this.indexJoueur = 0;
    this.chosenContact = {};
    this.randomContact();
  }
  ionViewDidEnter() {
    this.dataProvider.getWordList().subscribe(data => {
      this.wordListLength = data.length;
      this.wordList = data;
      console.log("ma word liste : " + this.wordList);
      this.randomWord();
    });
  }
  contactList = [];

  randomWord() {
    var i = Math.floor(Math.random() * this.wordListLength);
    this.chosenWord = this.wordList[i];
  }

  random() {
    this.changePlayer();
    this.randomContact();
    this.randomWord();
  }

  appel() {
    this.callNumber.callNumber("#31#" + this.chosenContact.number, true);
  }

  changePlayer() {
    if (this.indexJoueur == this.playerList.length) this.indexJoueur = 0;
    this.joueur = this.playerList[this.indexJoueur].name;
    this.indexJoueur++;
  }

  randomContact(): void {
    this.contacts
      .find(["displayName", "phoneNumbers", "photos"], {
        multiple: true,
        hasPhoneNumber: true
      })
      .then(contacts => {
        var i = Math.floor(Math.random() * contacts.length);
        if (contacts[i].displayName !== null) {
          this.chosenContact["name"] = contacts[i].displayName;
          this.chosenContact["number"] = contacts[i].phoneNumbers[0].value;
          if (contacts[i].photos != null) {
            console.log(contacts[i].photos);
            this.chosenContact["image"] = this.sanitizer.bypassSecurityTrustUrl(
              contacts[i].photos[0].value
            );
            console.log(this.chosenContact);
          } else {
            this.chosenContact["image"] = "assets/imgs/licorne.png";
          }
        }
      });
  }

  jeBoisAlert() {
    let alert = this.alertCtrl.create({
      title: "Je bois",
      subTitle: "Veux-tu vraiment passer ce défi ? Dans ce cas bois 5 gorgées.",
      buttons: [
        {
          text: "SANTE !",
          handler: data => {
            this.random();
          }
        },
        {
          text: "Non",
          role: "cancel"
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  appelAlert() {
    let alert = this.alertCtrl.create({
      title: "Appeler",
      subTitle: "Veux-tu vraiment appeler cette personne ?",
      buttons: [
        {
          text: "Oui j'appelle !",
          handler: data => {
            this.appel();
            this.random();
          }
        },
        {
          text: "Non",
          role: "cancel"
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  settings() {
    this.navCtrl.push(
      SettingsPage,
      {
        param1: this.playerList
      },
      {
        animate: true,
        animation: "md-transition"
      }
    );
  }

  backPage() {
    this.navCtrl.pop();
  }
}
