import { Capacitor } from '@capacitor/core';
import { AdMob, AdmobConsentStatus, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

let started = false;
const TEST_BANNER_ANDROID = 'ca-app-pub-3940256099942544/6300978111';

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
      adId: TEST_BANNER_ANDROID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 62,
      isTesting: true
    });
    started = true;
    console.info('AdMob test banner initialized.');
  } catch (error) {
    console.warn('AdMob is not ready:', error);
  }
}
window.startAdMob = startAdMob;
