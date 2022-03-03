import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ElysiumSharedModule } from 'app/shared/shared.module';
import { ElysiumCoreModule } from 'app/core/core.module';
import { ElysiumAppRoutingModule } from './app-routing.module';
import { ElysiumHomeModule } from './home/home.module';
import { ElysiumEntityModule } from './entities/entity.module';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [
    BrowserModule,
    ElysiumSharedModule,
    ElysiumCoreModule,
    ElysiumHomeModule,
    ElysiumEntityModule,
    ElysiumAppRoutingModule,
    GoogleChartsModule.forRoot(),
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class ElysiumAppModule {}
