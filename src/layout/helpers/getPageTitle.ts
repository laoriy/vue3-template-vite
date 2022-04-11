import { layout } from '../settings';

const title = layout.title || 'Aqara Admin';

export default function getPageTitle(pageTitle: string) {
    if (pageTitle) {
        return `${pageTitle}_${title}`;
    }
    return `${title}`;
}
