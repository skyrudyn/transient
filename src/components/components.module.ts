import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar';
import { ListComponent } from './list/list';
@NgModule({
	declarations: [CalendarComponent,
    ListComponent],
	imports: [],
	exports: [CalendarComponent,
    ListComponent]
})
export class ComponentsModule {}
