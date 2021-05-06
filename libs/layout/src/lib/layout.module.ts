import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {RouterModule} from '@angular/router'
import {SharedModule} from '@totobosports-new/shared'
import * as fromLayouts from './store/layouts.reducer';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {FooterContactInfoComponent} from './footer/components/footer-contact-info/footer-contact-info.component';
import {FooterQuickLinksComponent} from './footer/components/footer-quick-links/footer-quick-links.component';
import {FooterSocialLinksComponent} from './footer/components/footer-social-links/footer-social-links.component';
import { HeaderSearchComponent } from './header/components/search/header-search.component';
import { HeaderProfileComponent } from './header/components/profile/header-profile.component';
import { HeaderHelperComponent } from './header/components/header-helper/header-helper.component';
import { BrowseMenuComponent } from './header/components/browse-menu/browse-menu.component';
import { BrowseMenuDetailsComponent } from './header/components/browse-menu/components/browse-menu-details/browse-menu-details.component';
import { BrowseMenuListComponent } from './header/components/browse-menu/components/browse-menu-list/browse-menu-list.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromLayouts.LAYOUTS_FEATURE_KEY,
      fromLayouts.reducer
    ),
    EffectsModule.forFeature([]),
    RouterModule.forChild([]),
    SharedModule
  ],
  declarations: [HeaderComponent, FooterComponent
    , HeaderSearchComponent, HeaderHelperComponent,HeaderProfileComponent
    , BrowseMenuComponent, BrowseMenuDetailsComponent, BrowseMenuListComponent
    , FooterContactInfoComponent,FooterQuickLinksComponent,FooterSocialLinksComponent
  ],
  exports:[HeaderComponent,FooterComponent]
})
export class LayoutModule {}
