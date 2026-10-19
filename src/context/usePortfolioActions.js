import { useContentActions } from './actions/useContentActions';
import { useEngagementActions } from './actions/useEngagementActions';

export function usePortfolioActions(portfolioData, setPortfolioData, authToken) {
  const contentActions = useContentActions(portfolioData, setPortfolioData, authToken);
  const engagementActions = useEngagementActions(portfolioData, setPortfolioData, authToken);

  return {
    ...contentActions,
    ...engagementActions,
  };
}
