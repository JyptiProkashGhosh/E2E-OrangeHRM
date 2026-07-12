import { PageFactory } from '../pages/page.factory';
import { logger } from '../utils/logger';

export class RecruitmentService {
  private readonly pageFactory: PageFactory;

  constructor(pageFactory: PageFactory) {
    this.pageFactory = pageFactory;
  }

  public async navigateToRecruitmentModule(): Promise<void> {
    logger.info('RecruitmentService: Navigating to recruitment page');
    const sidebar = this.pageFactory.getSidebarComponent();
    await sidebar.clickRecruitment();
  }
}
