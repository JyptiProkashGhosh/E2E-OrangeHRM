import { HeaderComponent } from '../components/header.component';
import { logger } from '../utils/logger';

export class LogoutHelper {
  private readonly headerComponent: HeaderComponent;

  constructor(headerComponent: HeaderComponent) {
    this.headerComponent = headerComponent;
  }

  public async logout(): Promise<void> {
    logger.info('LogoutHelper: Executing logout flow');
    await this.headerComponent.clickProfileDropdown();
    await this.headerComponent.clickLogout();
  }
}
