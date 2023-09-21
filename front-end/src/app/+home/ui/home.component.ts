import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeStore } from '../data-access/store/home.store';
import { RxLet } from '@rx-angular/template/let';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RxLet,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSliderModule
  ],
  template: `
    <div class="w-full overflow-hidden h-full flex items-center justify-center">
      <div class="w-full overflow-hidden flex flex-col py-2 rounded-sm border border-solid border-black sm:w-[400px] h-[600px] ">
        <ul class="flex-1 flex flex-col flex-grow overflow-auto px-2" #scroll>
          <li *ngFor="let msg of vm().messageList" class="mb-1" [ngClass]="hStore.checkUser(msg.userName) ? 'text-right':'text-left'">
            <div>
              <span class="inline-block font-bold mr-2 capitalize">{{msg.userName}}</span>
              <span class="text-xs">{{msg.time | date: 'HH:mm'}}</span>
            </div>
            <span class="inline-block p-1 rounded-sm {{hStore.checkUser(msg.userName) ? 'bg-[#44a9fb] text-white':'bg-[#f2f2f2]'}}">{{msg.message}}</span>
          </li>
        </ul>
        <div class="w-full flex items-center flex-nowrap gap-x-1 px-2">
          <mat-form-field class="w-full sm:w-96" appearance="outline">
            <input matInput type="text" placeholder="Nhập text..." [formControl]="hStore.message" />
          </mat-form-field>
          <button type="button" (click)="hStore.sendMessage()"
            class="btn flex-shrink-0 w-[48px] h-[48px] bg-[#184E77] text-[#f2f2f2] rounded-md cursor-pointer hover:bg-opacity-90">
            Gửi
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .mat-mdc-form-field-bottom-align {
        display: none !important;
      }
    `
  ],
  providers: [HomeStore]
})
export class HomeComponent {
  @ViewChild('scroll', { static: true }) scroll: any;
  hStore = inject(HomeStore)
  vm = this.hStore.selectSignal(s => s);
  ngAfterViewChecked() {
    this.scroll.nativeElement.scrollTo(0, this.scroll.nativeElement.scrollHeight);
  }
}
