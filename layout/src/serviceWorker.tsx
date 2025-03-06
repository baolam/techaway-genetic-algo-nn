const publicVapidKey =
  'BPfmSooP7yJCiM337WINDY86AWbo5_che4R-Vz1s-fzY5MwKD2NBa4qPG4XPHl6IcNJnUaO1B0L-Ll3G5_cTyjo'

export async function requestPermission() {
  return await Notification.requestPermission()
}

export async function createNotificationSubscription() {
  const serviceWorker = await navigator.serviceWorker.ready
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  })
}

export function getUserSubscription() {
  return navigator.serviceWorker.ready.then((serviceWorker) =>
    serviceWorker.pushManager.getSubscription()
  )
}

export function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window
}
