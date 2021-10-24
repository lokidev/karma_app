import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MongoModule } from './components/mongo/mongo.module';
import { NavBarModule } from './components/nav-bar/nav-bar.module';
import { ReadMeModule } from './components/read-me/read-me.module';
import { TerminalCommandModule } from './components/read-me/terminal-command/terminal-command.module';
import { MyStoreModule } from './components/store/store.module';
import { KarmaComponent } from './components/karma/karma.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgeRangeComponent } from './components/karma/age-range/age-range.component';
import { MatingComponent } from './components/karma/mating/mating.component';
import { PopulationComponent } from './components/karma/population/population.component';

@NgModule({
  declarations: [
    AppComponent,
    KarmaComponent,
    AgeRangeComponent,
    PopulationComponent,
    MatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MongoModule,
    NavBarModule,
    MyStoreModule,
    TerminalCommandModule,
    ReadMeModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
