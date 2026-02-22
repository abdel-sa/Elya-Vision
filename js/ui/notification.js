/**
 * Notification UI Component
 */

/**
 * Show notification
 */
export function showNotification(message, type = 'success') {
  // Remove existing notification
  const existing = document.getElementById('notification');
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.add('is-active');
  }, 10);

  // Auto-remove
  setTimeout(() => {
    notification.classList.remove('is-active');
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

/**
 * Update cart badge
 */
export function updateCartBadge(count) {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;

  if (count > 0) {
    badge.textContent = count;
    badge.classList.add('is-active');
  } else {
    badge.textContent = '';
    badge.classList.remove('is-active');
  }
}
