import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { MenuPage } from "../pages/menu/menu";
import { SettingsPage } from "../pages/settings/settings";
import { PicoloPage } from "../pages/picolo/picolo";
import { HighwayPage } from "../pages/highway/highway";
import { BetSumPage } from "../pages/bet-sum/bet-sum";

import { PrankPhonePage } from "../pages/prank-phone/prank-phone";
import { firebaseConfig } from "../environnement";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Contacts } from "@ionic-native/contacts";
import { CallNumber } from "@ionic-native/call-number";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { DataProvider } from "../providers/data/data";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    SettingsPage,
    PicoloPage,
    HighwayPage,
    BetSumPage,
    PrankPhonePage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    SettingsPage,
    PicoloPage,
    HighwayPage,
    BetSumPage,
    PrankPhonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ScreenOrientation,
    Contacts,
    CallNumber,
    DataProvider
  ]
})
export class AppModule {}
