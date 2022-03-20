import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ChartType } from 'angular-google-charts';
import { StatService } from 'app/shared/service/stat.service';
import { HttpResponse } from '@angular/common/http';
import { IUserStat } from 'app/shared/model/userStat.model';
import { IdateStat } from 'app/shared/model/DateStat.model';
import { Row } from 'angular-google-charts/lib/components/chart-base/chart-base.component';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  titleUser = 'Message/User';
  titleDate = 'Message/Date';
  type = ChartType.ColumnChart;
  columnNamesUser = ['Message', 'User'];
  columnNamesDate = ['Message', 'Date'];
  options = {};
  width = 430;
  height = 400;
  dataDate: [string, number][] = [];
  dataUser: [string, number][] = [];
  constructor(private accountService: AccountService, private loginModalService: LoginModalService, private statService: StatService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.loadData();
  }
  private loadData(): void {
    this.statService
      .getUserStat({
        limit: '5',
      })
      .subscribe((res: HttpResponse<IUserStat[]>) => this.onSuccessUser(res.body));

    this.statService
      .getDateStat({
        limit: '5',
      })
      .subscribe((res: HttpResponse<IdateStat[]>) => this.onSuccessDate(res.body));
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  private onSuccessUser(userStates: IUserStat[] | null): void {
    userStates?.forEach(entry => {
      if (entry.login !== undefined && entry.number !== undefined && this.dataUser !== undefined) {
        this.dataUser.push([entry.login, entry.number]);
      }
    });
  }

  private onSuccessDate(dateStates: IdateStat[] | null): void {
    dateStates?.forEach(entry => {
      if (entry.creationDate !== undefined && entry.number !== undefined && this.dataDate !== undefined) {
        this.dataDate.push([entry.creationDate.toString(), entry.number]);
      }
    });
  }
}
