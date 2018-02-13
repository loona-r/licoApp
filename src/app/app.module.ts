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
import { SelfDrawPage } from "../pages/self-draw/self-draw";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    SettingsPage,
    PicoloPage,
    HighwayPage,
    BetSumPage,
    SelfDrawPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    SettingsPage,
    PicoloPage,
    HighwayPage,
    BetSumPage,
    SelfDrawPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
