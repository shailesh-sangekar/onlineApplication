import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { AuthHttp } from './services/authHttp.service';

import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
// import { MessageService } from './services/message.service';
import { CommonService } from './services/common.service';
import { SpService } from './services/spcommon.service';
import { AuthTokenService } from './services/authToken.service';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports: [CommonModule],
    declarations: [SpinnerComponent],
    exports: [CommonModule, ReactiveFormsModule,
        SpinnerComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [AuthHttp, SpinnerService, CommonService, SpService, AuthTokenService]
        };
    }
}
