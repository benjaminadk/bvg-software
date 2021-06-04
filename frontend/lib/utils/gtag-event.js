export default function gtagEvent({ action, category, label, value = 0 }) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
