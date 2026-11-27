import { Capacitor } from '@capacitor/core';
import { AdMob, AdmobConsentStatus, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

let started = false;
const BANNER_ANDROID = 'ca-app-pub-8770009560907706/7464182655';

async function startAdMob() {
  if (started || !Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return;
  try {
    let consent = await AdMob.requestConsentInfo();
    if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
      consent = await AdMob.showConsentForm();
    }
    if (!consent.canRequestAds) return;
    await AdMob.initialize();
    await AdMob.showBanner({
      adId: BANNER_ANDROID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 62,
      isTesting: true
    });
    started = true;
    console.info('AdMob banner initialized in test mode.');
  } catch (error) {
    console.warn('AdMob is not ready:', error);
  }
}
window.startAdMob = startAdMob;
