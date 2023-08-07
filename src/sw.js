// sw.js
self.addEventListener('push', (event) => {
  if (event.data) {
    const notificationPayload = event.data.text();
    const notificationData = JSON.parse(notificationPayload);

    const title = notificationData.title;
    const options = {
      body: notificationData.body,
    };

    event.waitUntil(self.registration.showNotification(title, options));
  }
});
