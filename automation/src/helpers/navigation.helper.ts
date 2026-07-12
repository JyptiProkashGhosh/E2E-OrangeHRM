import { SidebarComponent } from '../components/sidebar.component';
import { logger } from '../utils/logger';

export class NavigationHelper {
  private readonly sidebarComponent: SidebarComponent;

  constructor(sidebarComponent: SidebarComponent) {
    this.sidebarComponent = sidebarComponent;
  }

  public async navigateToAdmin(): Promise<void> {
    logger.info('NavigationHelper: Routing to Admin module');
    await this.sidebarComponent.clickAdmin();
  }

  public async navigateToPim(): Promise<void> {
    logger.info('NavigationHelper: Routing to PIM module');
    await this.sidebarComponent.clickPim();
  }

  public async navigateToLeave(): Promise<void> {
    logger.info('NavigationHelper: Routing to Leave module');
    await this.sidebarComponent.clickLeave();
  }
}
