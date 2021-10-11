import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KarmaComponent } from './components/karma/karma.component';
import { MongoComponent } from './components/mongo/mongo.component';
import { ReadMeComponent } from './components/read-me/read-me.component';
import { MyStoreComponent } from './components/store/store.component';

const routes: Routes = [
  { path: 'mongo', component: MongoComponent },
  { path: 'readme', component: ReadMeComponent },
  { path: 'store', component: MyStoreComponent },
  { path: 'karma', component: KarmaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
