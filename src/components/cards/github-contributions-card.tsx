import {ContributionCalendar} from '@hookraft/use-github-contributions';
import {Github} from 'lucide-react';

const GITHUB_USERNAME = 'kurtiz';
const CURRENT_YEAR = new Date().getFullYear();

export const GithubContributionsCard = () => {
    return (
        <div className="card-inset p-5">
            <div className="flex items-center gap-2 mb-4">
                <Github className="w-4 h-4 text-accent"/>
                <h3 className="font-semibold text-sm">GitHub Contributions</h3>
                <span className="font-mono text-xs text-muted-foreground ml-auto">
                    {CURRENT_YEAR}
                </span>
            </div>
            <div className="-mx-2 px-2">
                <ContributionCalendar
                    username={GITHUB_USERNAME}
                    year={CURRENT_YEAR}
                    theme="github"
                    blockSize={13}
                    blockGap={2.5}
                    showMonthLabels={true}
                    showDayLabels={true}
                    showThemeSwitcher={false}
                    className="w-full"
                />
            </div>
        </div>
    );
};