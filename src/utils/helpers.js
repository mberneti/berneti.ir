import moment from 'moment-jalaali';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

export function toPersianNumber(str) {
  const regex = /[0-9]/g;

  return (str + '').replace(regex, function(w) {
    return String.fromCharCode(parseInt(w) + '۰'.charCodeAt(0));
  });
}

export function formatReadingTime(minutes, lang) {
  let cups = Math.round(minutes / 5);
  let bowls = 0;
  if (cups > 5) {
    if (lang === 'fa')
      return `${new Array(Math.round(cups / Math.E))
        .fill('🍱')
        .join('')} خواندن ${toPersianNumber(minutes)} دقیقه`;
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`;
  } else {
    if (lang === 'fa')
      return `${new Array(cups || 1)
        .fill('☕️')
        .join('')} خواندن ${toPersianNumber(minutes)} دقیقه`;

    return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`;
  }
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date, lang) {
  if (lang === 'fa') return moment(date).format('jD jMMMM jYYYY');

  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [
    lang,
    { day: 'numeric', month: 'long', year: 'numeric' },
  ].filter(Boolean);

  return date.toLocaleDateString(...args);
}
