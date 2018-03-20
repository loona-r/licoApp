import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { Contacts } from "@ionic-native/contacts";
import { SettingsPage } from "../settings/settings";
import { CallNumber } from "@ionic-native/call-number";

@Component({
  selector: "page-prank-phone",
  templateUrl: "prank-phone.html"
})
export class PrankPhonePage {
  playerList: Array<{ id: number; name: string }>;
  joueur: string;
  contactChosen: any;
  indexJoueur: number;

  constructor(
    public alertCtrl: AlertController,
    private callNumber: CallNumber,
    private contacts: Contacts,
    private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.playerList = navParams.get("param1");
    this.joueur = this.playerList[0].name;
    this.indexJoueur = 0;
    this.contactChosen = {};
    this.randomContact();
  }

  contactList = [];

  random() {
    this.changePlayer();
    this.randomContact();
  }

  appel() {
    this.callNumber.callNumber("#31#" + this.contactChosen.number, true);
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
          this.contactChosen["name"] = contacts[i].displayName;
          this.contactChosen["number"] = contacts[i].phoneNumbers[0].value;
          if (contacts[i].photos != null) {
            console.log(contacts[i].photos);
            this.contactChosen["image"] = this.sanitizer.bypassSecurityTrustUrl(
              contacts[i].photos[0].value
            );
            console.log(this.contactChosen);
          } else {
            this.contactChosen["image"] = "assets/imgs/licorne.png";
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
