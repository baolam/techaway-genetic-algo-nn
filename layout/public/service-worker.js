self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: 'notification.logo.png',
    // badge: 'images/badge.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
