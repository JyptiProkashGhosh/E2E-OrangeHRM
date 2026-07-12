import { PageFactory } from '../pages/page.factory';
import { LeaveApi } from '../api/leave.api';
import { logger } from '../utils/logger';

export class LeaveService {
  private readonly pageFactory: PageFactory;
  private readonly leaveApi?: LeaveApi;

  constructor(pageFactory: PageFactory, leaveApi?: LeaveApi) {
    this.pageFactory = pageFactory;
    this.leaveApi = leaveApi;
  }

  public async navigateToApplyLeave(): Promise<void> {
    logger.info('LeaveService: Navigating to apply leave page');
    const sidebar = this.pageFactory.getSidebarComponent();
    await sidebar.clickLeave();
  }
}
