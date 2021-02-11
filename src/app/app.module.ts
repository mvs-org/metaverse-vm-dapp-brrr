import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { CounterComponent } from './components/counter/counter.component'
import { AccountComponent } from './components/account/account.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CounterIndicatorComponent } from './components/counter-indicator/counter-indicator.component'

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    AccountComponent,
    CounterIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
