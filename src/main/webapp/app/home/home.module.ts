import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElysiumSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import {GoogleChartsModule} from "angular-google-charts";


@NgModule({
  imports: [ElysiumSharedModule, RouterModule.forChild([HOME_ROUTE]), GoogleChartsModule],
  declarations: [HomeComponent],
})
export class ElysiumHomeModule {}
