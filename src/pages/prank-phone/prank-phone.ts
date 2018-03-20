import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { Contacts } from "@ionic-native/contacts";
import { SettingsPage } from "../settings/settings";

@Component({
  selector: "page-prank-phone",
  templateUrl: "prank-phone.html"
})
export class PrankPhonePage {
  playerList: Array<{ id: number; name: string }>;
  joueur: string;
  contactChosen: any;

  constructor(
    private contacts: Contacts,
    private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.playerList = navParams.get("param1");
    this.joueur = this.playerList[0].name;
    this.getContacts();
    //   this.randomContact();
  }

  contactList = [];

  getContacts(): void {
    this.contacts
      .find(["displayName", "phoneNumbers", "photos"], {
        multiple: true,
        hasPhoneNumber: true
      })
      .then(contacts => {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].displayName !== null) {
            var contact = {};
            contact["name"] = contacts[i].displayName;
            contact["number"] = contacts[i].phoneNumbers[0].value;
            if (contacts[i].photos != null) {
              console.log(contacts[i].photos);
              contact["image"] = this.sanitizer.bypassSecurityTrustUrl(
                contacts[i].photos[0].value
              );
              console.log(contact);
            } else {
              contact["image"] = "assets/imgs/licorne.png";
            }
            this.contactList.push(contact);
          }
        }
      });
  }

  randomContact() {
    var i = Math.floor(Math.random() * this.contactList.length);
    this.contactChosen["name"] = this.contactList[i].displayname;
    this.contactChosen["number"] = this.contactList[i].phoneNumbers[0].value;
    if (this.contactList[i].photos != null) {
      this.contactChosen["image"] = this.sanitizer.bypassSecurityTrustUrl(
        this.contactList[i].photos[0].value
      );
      console.log(this.contactChosen);
    } else {
      this.contactChosen["image"] = "assets/imgs/licorne.png";
    }
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
