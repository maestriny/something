import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/it';
import 'dayjs/locale/fr';
import 'dayjs/locale/es';
import 'dayjs/locale/de';
import i18n from '@/lib/i18n';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isToday);

function syncLocale(): void {
  dayjs.locale(i18n.language);
}

i18n.on('languageChanged', syncLocale);
syncLocale();

export default dayjs;
